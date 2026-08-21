import React, { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { tips } from "../data/tourData.js";
import "../styles/eventtips.css";
import { api } from "../services/api.js";

export default function EventTipsSection() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.getEvents({
          limit: 6
        });

        setEvents(
          Array.isArray(response?.data)
            ? response.data
            : []
        );
      } catch (error) {
        console.error(
          "Gagal memuat event:",
          error
        );

        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="event-tips-section">
      <div className="container">
        {/* Kalender Event */}
        <div className="event-panel">
          <h3 className="panel-title">Kalender Event</h3>
          {loadingEvents ? (
            <p>Memuat event...</p>
          ) : events.length > 0 ? (
            <div className="event-grid">
              {events.map((event, idx) => (
                <div className="event-box"key={event.slug || idx}>
                  <div className="event-date">
                    <CalendarDays size={14} />
                    <span>{event.date} {event.time && `(${event.time})`}</span>
                  </div>
                  <div className="event-title">{event.title}</div>
                  <div className="event-place">{event.place || event.locations 
                  ?.map((location) => location.nama) .filter(Boolean) 
                  .join(", ") || "Lokasi belum tersedia"}
                </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Belum ada event tersedia.</p>
          )}
        </div>

        {/* Tips Berwisata di bawah */}
        <div className="tips-panel">
          <h3 className="panel-title orange">Tips Berwisata</h3>
          {tips.map((tip, idx) => (
            <div className="tips-item" key={idx}>
              <span>{idx + 1}</span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}