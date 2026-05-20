import React from "react";
import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection.jsx";
import AISearchSection from "../components/AISearchSection.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import EventTipsSection from "../components/EventTipsSection.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import TourCard from "../components/TourCard.jsx";
import { api } from "../services/api.js";
import { categoryNameToCard, destinationsToTours } from "../utils/tourMapper.js";
import { categories as fallbackCategories } from "../data/tourData.js";

export default function Home() {
  const [categoryCards, setCategoryCards] = useState(fallbackCategories);
  const [recommended, setRecommended] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getCategories()
      .then((response) => {
        const cards = (response.data || []).map(categoryNameToCard);

        if (cards.length) {
          setCategoryCards(cards);
        }
      })
      .catch(() => {
        setCategoryCards(fallbackCategories);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .getFeaturedRecommendations({
        kategori: activeCategory,
        limit: 6
      })
      .then((response) => {
        const tours = destinationsToTours(response.data || []);
        setRecommended(tours);
      })
      .catch(() => {
        setError("Gagal mengambil rekomendasi dari backend.");
        setRecommended([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <>
      <HeroSection />
      <AISearchSection />

      <section className="category-section">
        <div className="container">
          <SectionHeader
            eyebrow="Kategori Wisata"
            title="Pilih Kategori Wisata"
            desc="Pilih kategori wisata sesuai dengan preferensi anda."
          />

          <div className="category-grid">
            {categoryCards.map((item) => (
              <CategoryCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="recommendation-section">
        <div className="container">
          <SectionHeader
            eyebrow="Rekomendasi Destinasi Utama"
            title="Destinasi Pilihan untuk Kamu"
            desc="Rekomendasi destinasi favorit berdasarkan rating dan jumlah ulasan"
          />

          <div className="filter-pill-row">
            <button
              type="button"
              className={activeCategory === "" ? "active" : ""}
              onClick={() => setActiveCategory("")}
            >
              Semua
            </button>

            <button
              type="button"
              className={activeCategory === "Wisata Alam" ? "active" : ""}
              onClick={() => setActiveCategory("Wisata Alam")}
            >
              Alam
            </button>

            <button
              type="button"
              className={activeCategory === "Wisata Sejarah" ? "active" : ""}
              onClick={() => setActiveCategory("Wisata Sejarah")}
            >
              Sejarah
            </button>

            <button
              type="button"
              className={activeCategory === "Wisata Kuliner" ? "active" : ""}
              onClick={() => setActiveCategory("Wisata Kuliner")}
            >
              Kuliner
            </button>
          </div>

          {error && <div className="state-box error">{error}</div>}

          {loading && (
            <div className="state-box">
              Memuat rekomendasi dari backend...
            </div>
          )}

          {!loading && !error && recommended.length === 0 && (
            <div className="state-box">
              Belum ada rekomendasi destinasi untuk kategori ini.
            </div>
          )}

          {!loading && !error && recommended.length > 0 && (
            <div className="tour-grid">
              {recommended.map((tour) => (
                <TourCard key={tour.id || tour.title} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      <EventTipsSection />
    </>
  );
}