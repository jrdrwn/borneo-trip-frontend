import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import TourCard from "../components/TourCard.jsx";
import { api } from "../services/api.js";
import { destinationsToTours } from "../utils/tourMapper.js";

export default function DestinationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialKategori = searchParams.get("kategori") || "";
  const initialWilayah = searchParams.get("wilayah") || "";
  const initialSearch = searchParams.get("search") || "";

  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [tours, setTours] = useState([]);

  const [filters, setFilters] = useState({
    kategori: initialKategori,
    wilayah: initialWilayah,
    search: initialSearch
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const updateUrlParams = (nextFilters) => {
    const params = {};

    if (nextFilters.kategori) params.kategori = nextFilters.kategori;
    if (nextFilters.wilayah) params.wilayah = nextFilters.wilayah;
    if (nextFilters.search) params.search = nextFilters.search;

    setSearchParams(params);
  };

  const loadDestinations = async (customFilters = filters) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.getDestinations({
        kategori: customFilters.kategori,
        wilayah: customFilters.wilayah,
        search: customFilters.search,
        limit: 80
      });

      setTours(destinationsToTours(response.data || []));
    } catch (err) {
      setTours([]);
      setError(err.message || "Gagal mengambil data destinasi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.getCategories()
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));

    api.getRegions()
      .then((res) => setRegions(res.data || []))
      .catch(() => setRegions([]));
  }, []);

  useEffect(() => {
    const nextFilters = {
      kategori: searchParams.get("kategori") || "",
      wilayah: searchParams.get("wilayah") || "",
      search: searchParams.get("search") || ""
    };

    setFilters(nextFilters);
    loadDestinations(nextFilters);
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUrlParams(filters);
    loadDestinations(filters);
  };

  const handleFilterChange = (key, value) => {
    const nextFilters = {
      ...filters,
      [key]: value
    };

    setFilters(nextFilters);

    if (key !== "search") {
      updateUrlParams(nextFilters);
    }
  };

  const clearFilters = () => {
    const emptyFilters = {
      kategori: "",
      wilayah: "",
      search: ""
    };

    setFilters(emptyFilters);
    setSearchParams({});
    loadDestinations(emptyFilters);
  };

  return (
    <section className="category-list-section all-destinations-page">
      <div className="container">
        <SectionHeader
          eyebrow="Knowledge Graph"
          title="Semua Destinasi"
          desc="Temukan destinasi, fasilitas, kategori, dan wilayah wisata di Kalimantan Tengah."
          align="left"
        />

        <form className="category-filter-form" onSubmit={handleSubmit}>
          <input
            value={filters.search}
            onChange={(event) => handleFilterChange("search", event.target.value)}
            placeholder="Cari fasilitas, nama destinasi, alamat, atau kata kunci..."
          />

          <select
            value={filters.kategori}
            onChange={(event) => handleFilterChange("kategori", event.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={filters.wilayah}
            onChange={(event) => handleFilterChange("wilayah", event.target.value)}
          >
            <option value="">Semua Wilayah</option>
            {regions.map((item) => (
              <option key={item.nama} value={item.nama}>
                {item.nama}
              </option>
            ))}
          </select>

          <button className="primary-btn" type="submit">
            Cari
          </button>

          <button className="secondary-btn" type="button" onClick={clearFilters}>
            Reset
          </button>
        </form>

        {error && <div className="state-box error">{error}</div>}
        {loading && <div className="state-box">Memuat destinasi...</div>}

        {!loading && !error && (
          <p className="result-info">
            Ditemukan {tours.length} destinasi.
          </p>
        )}

        {!loading && !error && tours.length === 0 && (
          <div className="state-box">
            Belum ada destinasi yang sesuai dengan pencarian.
          </div>
        )}

        <div className="tour-grid">
          {tours.map((tour) => (
            <TourCard key={tour.id || tour.title} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}