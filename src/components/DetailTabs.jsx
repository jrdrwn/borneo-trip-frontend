import React from "react";
import { useState } from "react";
import { ExternalLink, Image, Map, MessageSquareText, Star } from "lucide-react";

export default function DetailTabs({ tour }) {
  const [active, setActive] = useState("gallery");
  const gallery = Array.isArray(tour.gallery) && tour.gallery.length ? tour.gallery : [tour.image];
  const reviews = Array.isArray(tour.reviews) ? tour.reviews : [];

  return (
    <section className="detail-tabs-card">
      <div className="detail-tabs">
        <button className={active === "gallery" ? "active" : ""} onClick={() => setActive("gallery")}>
          <Image size={16} />Galeri Foto
        </button>

        <button className={active === "location" ? "active" : ""} onClick={() => setActive("location")}>
          <Map size={16} />Lokasi & Peta
        </button>

        <button className={active === "review" ? "active" : ""} onClick={() => setActive("review")}>
          <MessageSquareText size={16} />Rating & Ulasan
        </button>
      </div>

      {active === "gallery" && (
        <div className="gallery-panel">
          {gallery.map((image, index) => (
            <img key={`${image}-${index}`} src={image} alt={tour.title} />
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
      : tour?.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tour?.title || tour?.nama || "")}`
  }
  target="_blank"
  rel="noopener noreferrer"
  title="Buka lokasi di Google Maps"
>
  <Map size={38} />
  <span>Peta Area Wisata</span>
  <small>Klik untuk membuka Google Maps</small>
</a>

          <h3>Detail Lokasi</h3>
          <p>{tour.mapNote}</p>
          {tour.latitude && tour.longitude && (
            <p>Koordinat: {tour.latitude}, {tour.longitude}</p>
          )}
          {tour.url && tour.url !== "-" && (
            <a className="primary-btn map-link" href={tour.url} target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> Buka Link Lokasi
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
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
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
              {reviews.map((review) => (
                <article key={review.name}>
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

