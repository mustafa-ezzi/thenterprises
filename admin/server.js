import { randomBytes } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import busboy from "busboy";
import dotenv from "dotenv";
import express from "express";

const root = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(root, ".env") });

const CATEGORIES = [
  { slug: "safety", name: "Safety products" },
  { slug: "pneumatic", name: "Pneumatic materials" },
  { slug: "tools", name: "Power & hand tools" },
  { slug: "construction", name: "Construction materials" },
  { slug: "welding", name: "Welding & cutting" },
  { slug: "steel", name: "Iron & steel" },
  { slug: "hvac", name: "Air conditioning & refrigeration" },
  { slug: "electronics", name: "Electronic materials" },
  { slug: "electrical", name: "Electrical goods" },
  { slug: "pipes", name: "Pipes, fittings & valves" },
  { slug: "janitorial", name: "Stationery, packing, chemicals, janitorial" },
  { slug: "lubricants", name: "Lubricant oil & grease" },
  { slug: "medical", name: "Medical equipment" },
];

const required = [
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
  "R2_PUBLIC_BASE_URL",
];

const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length) {
  console.error(`Missing ${missing.join(", ")} in admin/.env`);
  console.error("Copy admin/.env.example to admin/.env and fill in your R2 keys.");
  process.exit(1);
}

const accountId = process.env.R2_ACCOUNT_ID.trim();
const bucket = process.env.R2_BUCKET_NAME.trim();
const publicBase = process.env.R2_PUBLIC_BASE_URL.trim().replace(/\/$/, "");
const endpoint = (process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`).replace(/\/$/, "");

const s3 = new S3Client({
  region: "auto",
  endpoint,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID.trim(),
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY.trim(),
  },
});

const uploadDir = path.join(root, ".uploads");
const app = express();
await mkdir(uploadDir, { recursive: true });
app.use(express.json());
app.use(express.static(path.join(root, "public")));

function readUpload(req) {
  return new Promise((resolve, reject) => {
    const contentType = String(req.headers["content-type"] || "");
    if (!contentType.includes("multipart/form-data")) {
      reject(new Error("Upload must be multipart form data."));
      return;
    }

    const bb = busboy({
      headers: req.headers,
      limits: { files: 50, fileSize: 20 * 1024 * 1024 },
    });
    const fields = {};
    const files = [];
    const pending = [];

    bb.on("field", (name, value) => {
      fields[name] = value;
    });

    bb.on("file", (_name, stream, info) => {
      const dest = path.join(uploadDir, randomBytes(16).toString("hex"));
      const out = createWriteStream(dest);
      pending.push(
        new Promise((done, fail) => {
          out.on("finish", done);
          out.on("error", fail);
          stream.on("error", fail);
          stream.on("limit", () => fail(new Error("File is larger than 20MB.")));
        }),
      );
      stream.pipe(out);
      files.push({
        path: dest,
        originalname: info.filename || "upload.jpg",
        mimetype: info.mimeType || "application/octet-stream",
      });
    });

    bb.on("error", reject);
    bb.on("close", () => {
      Promise.all(pending).then(() => resolve({ fields, files })).catch(reject);
    });

    req.pipe(bb);
  });
}

function publicUrl(key) {
  return `${publicBase}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

function sanitizeName(name) {
  const base = path.basename(name).replace(/\\/g, "/");
  return base.replace(/[^\w.\-]+/g, "-").replace(/-+/g, "-").toLowerCase();
}

function contentTypeFor(file) {
  if (file.mimetype && file.mimetype !== "application/octet-stream") return file.mimetype;
  if (/\.jfif$/i.test(file.originalname) || /\.jpe?g$/i.test(file.originalname)) return "image/jpeg";
  if (/\.png$/i.test(file.originalname)) return "image/png";
  if (/\.webp$/i.test(file.originalname)) return "image/webp";
  if (/\.gif$/i.test(file.originalname)) return "image/gif";
  return "application/octet-stream";
}

function prefixFor(kind, category, custom) {
  if (kind === "carousel") return "carousal/";
  if (kind === "hero") return "hero/";
  if (kind === "categories") return "categories/";
  if (kind === "custom") {
    const cleaned = String(custom || "")
      .replace(/^\/+|\/+$/g, "")
      .replace(/\.\./g, "");
    return cleaned ? `${cleaned}/` : "";
  }
  if (!category) throw new Error("Pick a category.");
  return `products/${category}/`;
}

async function listKeys(prefix) {
  const keys = [];
  let token;
  do {
    const page = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: token,
      }),
    );
    for (const item of page.Contents || []) {
      if (item.Key && !item.Key.endsWith("/")) keys.push(item.Key);
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return keys.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function nextNumber(keys, prefix) {
  let max = 0;
  for (const key of keys) {
    const name = key.slice(prefix.length);
    const match = name.match(/^(\d+)\./);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return max + 1;
}

app.get("/api/meta", (_req, res) => {
  res.json({
    bucket,
    publicBase,
    categories: CATEGORIES,
  });
});

app.get("/api/list", async (req, res) => {
  try {
    const prefix = prefixFor(String(req.query.kind || "products"), String(req.query.category || ""), String(req.query.prefix || ""));
    const keys = await listKeys(prefix);
    res.json({
      prefix,
      objects: keys.map((key) => ({ key, url: publicUrl(key) })),
    });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Could not list objects." });
  }
});

app.post("/api/upload", async (req, res) => {
  let files = [];
  const cleanup = () => Promise.all(files.map((file) => unlink(file.path).catch(() => undefined)));

  try {
    const parsed = await readUpload(req);
    files = parsed.files;
    const fields = parsed.fields;
    const kind = String(fields.kind || "products");
    const naming = String(fields.naming || "sequential");
    const prefix = prefixFor(kind, String(fields.category || ""), String(fields.prefix || ""));
    if (!files.length) {
      res.status(400).json({ error: "Choose at least one image." });
      return;
    }

    const existing = await listKeys(prefix);
    let next = nextNumber(existing, prefix);
    const uploaded = [];

    for (const file of files) {
      const ext = path.extname(file.originalname || ".jpg") || ".jpg";
      const filename =
        naming === "original" ? sanitizeName(file.originalname) : `${next}${ext.toLowerCase()}`;
      if (naming === "sequential") next += 1;
      const key = `${prefix}${filename}`;
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: createReadStream(file.path),
          ContentType: contentTypeFor(file),
        }),
      );
      uploaded.push({ key, url: publicUrl(key), original: file.originalname });
    }

    res.json({ prefix, uploaded });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Upload failed." });
  } finally {
    await cleanup();
  }
});

app.post("/api/delete", async (req, res) => {
  try {
    const key = String(req.body.key || "");
    if (!key || key.includes("..")) {
      res.status(400).json({ error: "Missing object key." });
      return;
    }
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    res.json({ ok: true, key });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Delete failed." });
  }
});

app.use((error, _req, res, _next) => {
  res.status(400).json({ error: error instanceof Error ? error.message : "Request failed." });
});

const port = Number(process.env.PORT || 8787);
app.listen(port, "127.0.0.1", () => {
  console.log(`T&H media admin → http://127.0.0.1:${port}`);
});
