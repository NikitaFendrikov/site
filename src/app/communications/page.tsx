"use client";

import { useState } from "react";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";
import {
  ProductionTab,
  AnimationTab,
  ThreeDTab,
  PresentationsTab,
  SitesTab,
} from "@/components/CommsSections";
import ScrollHint from "@/components/ScrollHint";
import { getLenis } from "@/lib/lenis-store";

type Tab = "production" | "animation" | "3d" | "presentations" | "sites";

const TABS: { id: Tab; label: string }[] = [
  { id: "production",    label: "ПЕЧАТНАЯ ПРОДУКЦИЯ" },
  { id: "animation",     label: "АНИМАЦИЯ" },
  { id: "3d",            label: "3D" },
  { id: "presentations", label: "ПРЕЗЕНТАЦИИ" },
  { id: "sites",         label: "САЙТЫ" },
];

export default function CommunicationsPage() {
  const [tab, setTab] = useState<Tab>("production");

  function handleTab(id: Tab) {
    setTab(id);
    getLenis()?.scrollTo(0, { immediate: true });
  }

  return (
    <main className="page-root comms-page">
      <div aria-hidden className="border-lines">
        <div className="absolute top-0 bottom-0 w-px bg-primary opacity-10" style={{ left: "var(--border-x)" }} />
        <div className="absolute top-0 bottom-0 w-px bg-primary opacity-10" style={{ right: "var(--border-x)" }} />
      </div>

      <div className="site-header">
        <Link href="/"><ScrambleText className="typo-nav">НА ГЛАВНУЮ</ScrambleText></Link>
      </div>

      <nav className="comms-tabs-nav">
        <div className="comms-tabs-pill">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              className={`comms-tab-btn${tab === id ? " active" : ""}`}
              onClick={() => handleTab(id)}
            >
              <span className="typo-nav">{label}</span>
              {tab === id && <div className="comms-tab-dot" />}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile placeholder */}
      <div className="comms-mobile-placeholder">
        <p className="typo-body2 text-primary" style={{ textAlign: "center" }}>
          Мобильная адаптация страницы находится на стадии разработки. К сожалению эту страницу пока можно посмотреть только на компьютере.
        </p>
        <Link href="/"><ScrambleText className="typo-nav">НА ГЛАВНУЮ</ScrambleText></Link>
      </div>

      <div className="comms-content">
        {tab === "production"    && <ProductionTab />}
        {tab === "animation"     && <AnimationTab />}
        {tab === "3d"            && <ThreeDTab />}
        {tab === "presentations" && <PresentationsTab />}
        {tab === "sites"         && <SitesTab />}
      </div>

      {(tab === "presentations" || tab === "sites") && (
        <ScrollHint targetSelector=".case-card" offset={-80} />
      )}
    </main>
  );
}
