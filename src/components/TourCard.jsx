import { Calendar, MapPin, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  return (
    <React.Fragment>
    <article className="tour-card">
      <div className="tour-image-wrap">
        <img
          src={tour.image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"}
          alt={tour.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";
          }}
        />
        {tour.badge && <span>{tour.badge}</span>}
      </div>

      <div className="tour-card-body">
        <h3>{tour.title}</h3>

        {tour.date && (
          <p className="tour-date">
            <Calendar size={14} />
            {tour.date} {tour.time && `(${tour.time})`}
          </p>
        )}

        {tour.location && (
          <p className="tour-location">
            <MapPin size={14} />
            {tour.location || tour.place}
          </p>
        )}

        {tour.shortDesc && <p>{tour.shortDesc || tour.description}</p>}

        <div className="tour-card-footer">
          {tour.rating && (
            <div className="tour-rating">
              <Star size={14} fill="currentColor" />
              {tour.rating}
            </div>
          )}

          {tour.slug && (
            <Link to={`/wisata/${encodeURIComponent(tour.slug)}`}>
              Detail
            </Link>
          )}
        </div>
      </div>
    </article>
    </React.Fragment>
  );
}