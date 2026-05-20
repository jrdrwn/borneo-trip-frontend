import React from "react";
import { CalendarDays, Lightbulb } from "lucide-react";
import { events, tips } from "../data/tourData.js";

export default function EventTipsSection() {
  return (
    <section className="event-tips-section">
      <div className="container event-tips-grid">
        <div className="mini-panel event-panel">
          <div className="panel-title">
            <CalendarDays size={18} />
            <h3>Kalender Event</h3>
          </div>

          {events.map((event) => (
            <div className="event-item" key={event.title}>
              <span>{event.date}</span>
              <div>
                <strong>{event.title}</strong>
                <small>{event.place}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="mini-panel tips-panel">
          <div className="panel-title orange">
            <Lightbulb size={18} />
            <h3>Tips Berwisata</h3>
          </div>

          {tips.map((tip, index) => (
            <div className="tips-item" key={tip}>
              <span>{index + 1}</span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

