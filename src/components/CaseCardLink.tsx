"use client";

import { useState } from "react";
import { useNavigation } from "@/context/NavigationContext";
import ScrambleText from "./ScrambleText";

export default function CaseCardLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const { navigateTo } = useNavigation();

  return (
    <div
      className="case-card-image"
      style={{ cursor: "pointer" }}
      onClick={() => navigateTo(href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div className="card-overlay">
        <ScrambleText className="typo-nav" style={{ color: "#ffffff" }} playing={hovered}>
          СМОТРЕТЬ КЕЙС
        </ScrambleText>
      </div>
    </div>
  );
}
