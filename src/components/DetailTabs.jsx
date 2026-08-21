import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, Image, Map, MessageSquareText, Star } from "lucide-react";

function GalleryImage({ src, title, index, attribution, source }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <figure className="gallery-item">
      <img
        src={src}
        alt={`Foto ${title} ${index + 1}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />

      {(attribution?.name || source) && (
        <figcaption>
          <span>
            {attribution?.url ? (
              <a href={attribution.url} target="_blank" rel="noreferrer">
                {attribution.name || "Kontributor Google"}
              </a>
            ) : (
              attribution?.name || "Sumber foto"
            )}
          </span>
          {source && <small>{source}</small>}
        </figcaption>
      )}
    </figure>
  );
}

export default function DetailTabs({ tour }) {
  const gallery = useMemo(
    () => (Array.isArray(tour.gallery) ? tour.gallery.filter(Boolean) : []),
    [tour.gallery]
  );
  const galleryAttributions = Array.isArray(tour.galleryAttributions)
    ? tour.galleryAttributions
    : [];
  const hasGallery = gallery.length > 0;
  const [active, setActive] = useState(hasGallery ? "gallery" : "location");
  const reviews = Array.isArray(tour.reviews) ? tour.reviews : [];

  useEffect(() => {
    setActive(hasGallery ? "gallery" : "location");
  }, [hasGallery, tour.id]);

  return (
    <section className="detail-tabs-card">
      <div className="detail-tabs">
        {hasGallery && (
          <button
            className={active === "gallery" ? "active" : ""}
            onClick={() => setActive("gallery")}
          >
            <Image size={16} /> Galeri Foto
          </button>
        )}

        <button
          className={active === "location" ? "active" : ""}
          onClick={() => setActive("location")}
        >
          <Map size={16} /> Lokasi & Peta
        </button>

        <button
          className={active === "review" ? "active" : ""}
          onClick={() => setActive("review")}
        >
          <MessageSquareText size={16} /> Rating & Ulasan
        </button>
      </div>

      {active === "gallery" && hasGallery && (
        <div className="gallery-panel">
          {gallery.map((image, index) => (
            <GalleryImage
              key={`${image}-${index}`}
              src={image}
              title={tour.title}
              index={index}
              attribution={galleryAttributions[index]}
              source={tour.isGooglePlacesPhoto ? tour.imageSource : ""}
            />
          ))}
        </div>
      )}

      {active === "location" && (
        <div className="location-panel">
          <a
            className="map-placeholder map-clickable"
            href={
              tour?.latitude && tour?.longitude
                ? `https://www.google.com/maps?q=${tour.latitude},${tour.longitude}`
                : tour?.url && tour.url !== "Belum ada informasi tautan"
                  ? tour.url
                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tour?.title || "")}`
            }
            target="_blank"
            rel="noopener noreferrer"
            title="Buka lokasi di Google Maps"
          >
            <Map size={38} />
            <span>Buka lokasi di Google Maps</span>
            <small>Tidak memerlukan API key</small>
          </a>

          <h3>Detail Lokasi</h3>
          <p>{tour.mapNote}</p>
          {tour.latitude && tour.longitude && (
            <p>Koordinat: {tour.latitude}, {tour.longitude}</p>
          )}
          {tour.url && tour.url !== "Belum ada informasi tautan" && (
            <a
              className="primary-btn map-link"
              href={tour.url}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={16} /> Buka tautan lokasi
            </a>
          )}
        </div>
      )}

      {active === "review" && (
        <div className="review-panel">
          <div className="rating-summary">
            <div>
              <strong>{tour.rating}</strong>
              <span>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={16} fill="currentColor" />
                ))}
              </span>
              <small>Berdasarkan {tour.reviewCount} ulasan</small>
            </div>

            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map((item) => (
                <p key={item}>
                  <span>{item}</span>
                  <b><i style={{ width: `${item * 18}%` }} /></b>
                </p>
              ))}
            </div>
          </div>

          <div className="write-review">
            <h3>Tulis Ulasan Anda</h3>
            <div className="star-input">★★★★★</div>
            <textarea placeholder="Ceritakan pengalaman kamu mengunjungi tempat ini..." />
            <button className="primary-btn">Kirim Ulasan</button>
          </div>

          {reviews.length > 0 ? (
            <div className="review-list">
              {reviews.map((review, index) => (
                <article key={`${review.name || "review"}-${index}`}>
                  <div>
                    <strong>{review.name}</strong>
                    <span>{"★".repeat(review.rating)}</span>
                  </div>
                  <p>{review.text}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-note">Belum ada ulasan tambahan dari pengunjung.</p>
          )}
        </div>
      )}
    </section>
  );
}
