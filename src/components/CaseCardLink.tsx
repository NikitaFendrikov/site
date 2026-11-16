"use client";

import { useState } from "react";
import { useNavigation } from "@/context/NavigationContext";
import ScrambleText from "./ScrambleText";
import ImageReveal from "./ImageReveal";

/* Карточка целиком — ссылка: картинка с оверлеем и подпись под ней (meta).
   Ховер на любой части карточки показывает оверлей со скрэмблом. */
export default function CaseCardLink({
  href,
  children,
  meta,
  className = "",
  external = false,
  label = "СМОТРЕТЬ КЕЙС",
  labelClassName = "typo-nav",
}: {
  href: string;
  children: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
  external?: boolean;
  label?: string;
  labelClassName?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const { navigateTo } = useNavigation();

  const onClick = (e: React.MouseEvent) => {
    // Внутренние ссылки — через переход сайта; Ctrl/Cmd-клик открывает как обычно
    if (external || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <a
      href={href}
      className={`card-link ${className}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ImageReveal>
        <div className="case-card-image">
          {children}
          <div className="card-overlay">
            <ScrambleText className={labelClassName} style={{ color: "#ffffff" }} playing={hovered}>
              {label}
            </ScrambleText>
          </div>
        </div>
      </ImageReveal>
      {meta}
    </a>
  );
}
