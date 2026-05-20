import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, Search, X, ChevronDown, Bot } from "lucide-react";
import { api } from "../services/api.js";

export default function Header() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .getCategories()
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  const closeMenu = () => {
    setOpen(false);
    setCategoryOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const q = keyword.trim();

    if (!q) {
      navigate("/destinasi");
      closeMenu();
      return;
    }

    navigate(`/destinasi?search=${encodeURIComponent(q)}`);
    setKeyword("");
    closeMenu();
  };

  const handleCategoryClick = (category) => {
    const query = category ? `?kategori=${encodeURIComponent(category)}` : "";
    navigate(`/destinasi${query}`);
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
          aria-label="BorneoTrip - Beranda"
        >
         <img
  src="/images/Logo-BorneoTrip.png"
  alt="BorneoTrip Logo"
  className="logo-image"
/>
        </Link>

        <nav className={`nav-menu ${open ? "show" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Beranda
          </NavLink>

          <NavLink to="/destinasi" onClick={closeMenu}>
            Destinasi
          </NavLink>

          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-button"
              onClick={() => setCategoryOpen((prev) => !prev)}
            >
              Kategori
              <ChevronDown size={15} />
            </button>

            {categoryOpen && (
              <div className="nav-category-menu">
                <button type="button" onClick={() => handleCategoryClick("")}>
                  Semua Kategori
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/ai-chat" onClick={closeMenu}>
            AI Assistant
          </NavLink>
        </nav>

        <div className="header-actions">
          <form className="header-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Cari fasilitas/destinasi..."
            />
            <button type="submit" aria-label="Cari destinasi atau fasilitas">
              <Search size={16} />
            </button>
          </form>

          <Link
            to="/ai-chat"
            className="ai-button"
            aria-label="AI Assistant"
            onClick={closeMenu}
          >
            <Bot size={16} />
          </Link>

          <button
            type="button"
            className="mobile-button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Menu"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}