import React from "react";
import { useEffect, useState } from "react";
import TourCard from "./TourCard.jsx";
import SectionHeader from "./SectionHeader.jsx";
import { api } from "../services/api.js";
import { destinationsToTours } from "../utils/tourMapper.js";

export default function CategoryPageLayout({ eyebrow, title, desc, kategori, tone = "green" }) {
  const [tours, setTours] = useState([]);
  const [regions, setRegions] = useState([]);
  const [wilayah, setWilayah] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDestinations = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.getDestinations({ kategori, wilayah, search, limit: 60 });
      setTours(destinationsToTours(response.data || []));
    } catch (err) {
      setError(err.message || "Gagal mengambil data destinasi dari backend.");
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.getRegions()
      .then((res) => setRegions(res.data || []))
      .catch(() => setRegions([]));
  }, []);

  useEffect(() => {
    loadDestinations();
  }, [kategori, wilayah]);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadDestinations();
  };

  return (
    <>
      <section className={`category-hero ${tone}`}>
        <div className="container">
          <p className="breadcrumb">Beranda / {title}</p>
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
      </section>

      <section className="category-list-section">
        <div className="container">
          <SectionHeader
            eyebrow={eyebrow}
            title={`Rekomendasi ${title}`}
            desc="Data destinasi diambil dari Knowledge Graph Neo4j melalui backend FastAPI."
            align="left"
          />

          <form className="category-filter-form" onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama destinasi, alamat, atau kata kunci..."
            />
            <select value={wilayah} onChange={(event) => setWilayah(event.target.value)}>
              <option value="">Semua Wilayah</option>
              {regions.map((item) => (
                <option key={item.nama} value={item.nama}>{item.nama}</option>
              ))}
            </select>
            <button className="primary-btn">Cari</button>
          </form>

          {error && <div className="state-box error">{error}</div>}
          {loading && <div className="state-box">Memuat data destinasi...</div>}

          {!loading && !error && tours.length === 0 && (
            <div className="state-box">Belum ada destinasi untuk filter ini.</div>
          )}

          <div className="tour-grid">
            {tours.map((tour) => (
              <TourCard key={tour.id || tour.title} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

