import { useState } from "react";
import { CardBanner } from "./TrainArt";

const PHOTO_COUNT = 6;

// Shows a real photo from /public/images; falls back to the illustration if the file is missing
export default function RouteImage({ seed = 0, alt = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) return <CardBanner seed={seed} />;

  const n = (Math.abs(seed) % PHOTO_COUNT) + 1;
  return (
    <div className="card-banner">
      <img
        src={`/images/train-${n}.jpg`}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
