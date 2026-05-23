import { CalendarDays } from "lucide-react";
import React, { useEffect, useState } from "react";
import { tips } from "../data/tourData.js";
import "../styles/eventtips.css";

export default function EventTipsSection() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/public/events`);
        if (!res.ok) throw new Error("Gagal memuat event");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <React.Fragment>
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
                <div className="event-box" key={idx}>
                  <div className="event-date">
                    <CalendarDays size={14} />
                    <span>{event.date} {event.time && `(${event.time})`}</span>
                  </div>
                  <div className="event-title">{event.title}</div>
                  <div className="event-place">{event.place}</div>
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
    </React.Fragment>
  );
}