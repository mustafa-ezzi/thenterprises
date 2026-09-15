import { media } from "../../media";

export function HeroMedia() {
  return (
    <div className="hero-media hero-photo">
      <img src={media.heroPoster} alt="" width={1920} height={1080} className="hero-poster" />
    </div>
  );
}
