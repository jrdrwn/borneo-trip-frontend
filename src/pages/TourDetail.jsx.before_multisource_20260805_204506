import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Globe,
  MapPin,
  Phone,
  Star,
  Ticket
} from "lucide-react";
import { useEffect, useState } from "react";
import DetailTabs from "../components/DetailTabs.jsx";
import { api } from "../services/api.js";
import { destinationToTour, isEmptyValue } from "../utils/tourMapper.js";

export default function TourDetail() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .getDestinationDetail(slug)
      .then((response) => {
        setTour(destinationToTour(response.data));
      })
      .catch((err) => {
        setError(err.message || "Destinasi tidak ditemukan");
      })
      .finally(() => {
        setLoading(false);
      });
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

  const hasFacilities =
    Array.isArray(tour.facilities) &&
    tour.facilities.length > 0 &&
    !tour.facilities.every((item) => isEmptyValue(item));

  return (
    <section className="detail-page">
      <div className="container">
        <p className="breadcrumb">Beranda / Detail</p>

        <div className="detail-hero-card">
          <div className="detail-image">
            <img
              src={tour.image}
              alt={tour.title}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.src =
                  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <span>{tour.badge}</span>
          </div>

          <div className="detail-info">
            <h1>{tour.title}</h1>
            <p>{tour.description}</p>

            <div className="info-list">
              <div>
                <MapPin size={18} />
                <span>{tour.location}</span>
              </div>

              <div>
                <Clock size={18} />
                <span>{tour.time}</span>
              </div>

              <div>
                <Ticket size={18} />
                <span>{tour.ticket}</span>
              </div>

              <div>
                <Star size={18} fill="currentColor" />
                <span>
                  {typeof tour.rating === "number"
                    ? `${tour.rating} / 5.0`
                    : tour.rating}
                </span>
              </div>

              <div>
                <Phone size={18} />
                <span>{tour.telepon}</span>
              </div>

              <div>
                <Globe size={18} />
                <span>{tour.website}</span>
              </div>
            </div>
          </div>
        </div>

        <DetailTabs tour={tour} />

        <section className="facilities-card">
          <h2>Fasilitas</h2>

          <div className="facility-grid">
            {hasFacilities ? (
              tour.facilities.map((item, index) => (
                <span key={`${item}-${index}`}>
                  <CalendarDays size={15} />
                  {item}
                </span>
              ))
            ) : (
              <span>
                <CalendarDays size={15} />
                Informasi fasilitas belum tersedia
              </span>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}