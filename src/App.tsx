import { Route, Routes } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { About } from "./pages/About";
import { Brands } from "./pages/Brands";
import { Category } from "./pages/Category";
import { Contact } from "./pages/Contact";
import { Cookies } from "./pages/Cookies";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Privacy } from "./pages/Privacy";
import { Products } from "./pages/Products";
import { Service } from "./pages/Service";
import { Services } from "./pages/Services";
import { Terms } from "./pages/Terms";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<RootLayout />}>
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<Category />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<Service />} />
        <Route path="brands" element={<Brands />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
