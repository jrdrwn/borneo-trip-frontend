// @ts-ignore
import React from "react";

export default function SectionHeader({ eyebrow, title, desc, align = "center" }) {

  return (
    <React.Fragment>
    <div className={`section-header ${align === "left" ? "left" : ""}`}>
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
    </React.Fragment>
  );
}
