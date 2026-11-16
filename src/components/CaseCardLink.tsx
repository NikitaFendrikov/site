"use client";

import { useState } from "react";
import Link from "next/link";
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

  const props = {
    className: `card-link ${className}`,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  const content = (
    <>
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
    </>
  );

  // Внешние ссылки и PDF — в новой вкладке
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  // Кейсы — через Link: Next заранее подгружает страницу, переход без ожидания
  return (
    <Link href={href} {...props}>
      {content}
    </Link>
  );
}
