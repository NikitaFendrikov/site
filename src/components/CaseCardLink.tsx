"use client";

import { useState } from "react";
import { useNavigation } from "@/context/NavigationContext";
import ScrambleText from "./ScrambleText";

export default function CaseCardLink({
  href,
  children,
  external = false,
  labelClassName = "typo-nav",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  labelClassName?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const { navigateTo } = useNavigation();

  const open = () => {
    if (external) window.open(href, "_blank", "noopener,noreferrer");
    else navigateTo(href);
  };

  return (
    <div
      className="case-card-image"
      style={{ cursor: "pointer" }}
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => e.key === "Enter" && open()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div className="card-overlay">
        <ScrambleText className={labelClassName} style={{ color: "#ffffff" }} playing={hovered}>
          СМОТРЕТЬ КЕЙС
        </ScrambleText>
      </div>
    </div>
  );
}
