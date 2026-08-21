import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImageOff, MapPin, Star } from "lucide-react";

export default function TourCard({ tour }) {
  const [imageSrc, setImageSrc] = useState(tour.image || tour.fallbackImage || "");
  const [usingFallback, setUsingFallback] = useState(!tour.hasDestinationPhoto);
  const [imageUnavailable, setImageUnavailable] = useState(false);

  useEffect(() => {
    setImageSrc(tour.image || tour.fallbackImage || "");
    setUsingFallback(!tour.hasDestinationPhoto);
    setImageUnavailable(false);
  }, [tour.image, tour.fallbackImage, tour.hasDestinationPhoto]);

  const handleImageError = () => {
    if (!usingFallback && tour.fallbackImage) {
      setImageSrc(tour.fallbackImage);
      setUsingFallback(true);
      return;
    }

    setImageSrc("");
    setUsingFallback(true);
    setImageUnavailable(true);
  };

  const hasNumericRating = typeof tour.rating === "number";

  return (
    <article className="tour-card">
      <div className={`tour-image-wrap ${usingFallback ? "category-visual" : ""}`}>
        {!imageUnavailable && imageSrc ? (
          <img
            src={imageSrc}
            alt={usingFallback ? `Visual kategori ${tour.category}` : `Foto ${tour.title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        ) : (
          <div className="tour-image-empty" role="img" aria-label={`Foto ${tour.title} belum tersedia`}>
            <ImageOff size={28} />
            <span>Foto belum tersedia</span>
          </div>
        )}

        <div className="tour-image-shade" aria-hidden="true" />
        {tour.badge && <div className="tour-category-badge">{tour.badge}</div>}
      </div>

      <div className="tour-card-body">
        <h3 title={tour.title}>{tour.title}</h3>

        {tour.location && (
          <p className="tour-location">
            <MapPin size={15} />
            <span>{tour.location}</span>
          </p>
        )}

        {tour.shortDesc && <p className="tour-description">{tour.shortDesc}</p>}

        <div className="tour-card-footer">
          <div className={`tour-rating ${hasNumericRating ? "" : "rating-empty"}`}>
            <Star size={15} fill={hasNumericRating ? "currentColor" : "none"} />
            {hasNumericRating ? tour.rating : "Belum dinilai"}
          </div>

          {tour.slug && (
            <Link to={`/wisata/${encodeURIComponent(tour.slug)}`}>
              Lihat detail
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
