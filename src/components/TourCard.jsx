import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

export default function TourCard({ tour }) {
  return (
    <article className="tour-card">
      <div className="tour-image-wrap">
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

      <div className="tour-card-body">
        <h3>{tour.title}</h3>

        <p className="tour-location">
          <MapPin size={14} />
          {tour.location}
        </p>

        <p>{tour.shortDesc}</p>

        <div className="tour-card-footer">
          <div className="tour-rating">
            <Star size={14} fill="currentColor" />
            {tour.rating}
          </div>

          <Link to={`/wisata/${encodeURIComponent(tour.slug)}`}>
            Detail
          </Link>
        </div>
      </div>
    </article>
  );
}