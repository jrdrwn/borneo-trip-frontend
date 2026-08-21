import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  ImageOff,
  MapPin,
  Phone,
  Star,
  Ticket
} from "lucide-react";
import DetailTabs from "../components/DetailTabs.jsx";
import { api } from "../services/api.js";
import { destinationToTour, isEmptyValue } from "../utils/tourMapper.js";

export default function TourDetail() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [heroMode, setHeroMode] = useState("primary");

  useEffect(() => {
    setLoading(true);
    setError("");
    setHeroMode("primary");

    api
      .getDestinationDetail(slug)
      .then((response) => setTour(destinationToTour(response.data)))
      .catch((err) => setError(err.message || "Destinasi tidak ditemukan"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="detail-page">
        <div className="container">
          <div className="state-box">Memuat detail destinasi...</div>
        </div>
      </section>
    );
  }

  if (error || !tour) {
    return (
      <section className="detail-page">
        <div className="container">
          <h1>Destinasi tidak ditemukan</h1>
          <p className="error-text">{error}</p>
          <Link to="/destinasi" className="primary-btn">
            Kembali ke Destinasi
          </Link>
        </div>
      </section>
    );
  }

  const usingCategoryVisual = tour.isPlaceholder || heroMode === "fallback";
  const heroUnavailable = heroMode === "empty";
  const heroSrc = heroMode === "primary" ? tour.image : tour.fallbackImage;

  const handleHeroError = () => {
    if (heroMode === "primary" && tour.fallbackImage) {
      setHeroMode("fallback");
      return;
    }
    setHeroMode("empty");
  };

  const hasFacilities =
    Array.isArray(tour.facilities) &&
    tour.facilities.length > 0 &&
    !tour.facilities.every((item) => isEmptyValue(item));
  const hasAttribution =
    !usingCategoryVisual &&
    !heroUnavailable &&
    [
      tour.imageSource,
      tour.imageArtist,
      tour.imageLicense,
      tour.imageAttribution
    ].some((value) => !isEmptyValue(value));

  return (
    <section className="detail-page">
      <div className="container">
        <p className="breadcrumb">Beranda / Destinasi / {tour.title}</p>

        <div className="detail-hero-card">
          <div className={`detail-image ${usingCategoryVisual ? "category-visual" : ""}`}>
            {!heroUnavailable && heroSrc ? (
              <img
                src={heroSrc}
                alt={usingCategoryVisual ? `Visual kategori ${tour.category}` : `Foto ${tour.title}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={handleHeroError}
              />
            ) : (
              <div className="detail-image-empty" role="img" aria-label={`Foto ${tour.title} belum tersedia`}>
                <ImageOff size={42} />
                <strong>Foto belum tersedia</strong>
                <span>Informasi destinasi tetap dapat dilihat di halaman ini.</span>
              </div>
            )}

            <div className="detail-image-shade" aria-hidden="true" />
            <div className="detail-category-badge">{tour.badge}</div>
            {usingCategoryVisual && !heroUnavailable && (
              <div className="detail-visual-badge">
                <ImageIcon size={14} /> Visual kategori
              </div>
            )}
            {tour.isGooglePlacesPhoto && !heroUnavailable && (
              <div className="detail-google-badge">
                <ImageIcon size={14} /> Google Places
              </div>
            )}
          </div>

          <div className="detail-info">
            <h1>{tour.title}</h1>
            <p>{tour.description}</p>

            <div className="info-list">
              <div><MapPin size={18} /><span>{tour.location}</span></div>
              <div><Clock size={18} /><span>{tour.time}</span></div>
              <div><Ticket size={18} /><span>{tour.ticket}</span></div>
              <div>
                <Star size={18} fill="currentColor" />
                <span>
                  {typeof tour.rating === "number" ? `${tour.rating} / 5.0` : tour.rating}
                </span>
              </div>
              <div><Phone size={18} /><span>{tour.telepon}</span></div>
              <div><Globe size={18} /><span>{tour.website}</span></div>
            </div>
          </div>
        </div>

        {(usingCategoryVisual || heroUnavailable) && (
          <p className="visual-note">
            <ImageIcon size={16} />
            Foto destinasi belum tersedia. Visual di atas hanya mewakili kategori {tour.category}.
          </p>
        )}

        {hasAttribution && (
          <section className="image-attribution-compact">
            <ImageIcon size={17} />
            <div>
              <strong>Sumber foto</strong>
              <span>
                {[tour.imageArtist, tour.imageLicense, tour.imageSource]
                  .filter((value) => !isEmptyValue(value))
                  .join(" · ")}
              </span>
              {!isEmptyValue(tour.imageAttribution) && (
                <small>{tour.imageAttribution}</small>
              )}
            </div>
            {!isEmptyValue(tour.imagePageUrl) && (
              <a href={tour.imagePageUrl} target="_blank" rel="noreferrer">
                Sumber asli <ExternalLink size={14} />
              </a>
            )}
          </section>
        )}

        <DetailTabs tour={tour} />

        <section className="facilities-card">
          <h2>Fasilitas</h2>
          <div className="facility-grid">
            {hasFacilities ? (
              tour.facilities.map((item, index) => (
                <span key={`${item}-${index}`}>
                  <CalendarDays size={15} /> {item}
                </span>
              ))
            ) : (
              <span><CalendarDays size={15} /> Informasi fasilitas belum tersedia</span>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
