import React from "react";
import { Link } from "react-router-dom";
import { Landmark, Mountain, UtensilsCrossed } from "lucide-react";

const icons = { Mountain, Landmark, Utensils: UtensilsCrossed };

export default function CategoryCard({ item }) {
  const Icon = icons[item.icon];

  return (
    <Link to={item.path} className="category-card">
      <div className="category-icon"><Icon size={22} /></div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </Link>
  );
}

