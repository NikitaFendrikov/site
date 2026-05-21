import Link from "next/link";
import { images } from "@/lib/images";
import ScrambleText from "@/components/ScrambleText";
import ImageReveal from "@/components/ImageReveal";

export default function Home() {
  return (
    <main className="page-root">

      {/* Декоративные боковые линии */}
      <div aria-hidden="true" className="border-lines">
        <div
          className="absolute top-0 bottom-0 w-px bg-primary opacity-10"
          style={{ left: "var(--border-x)" }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-primary opacity-10"
          style={{ right: "var(--border-x)" }}
        />
      </div>

      {/* Имя — fixed, кликабельно только по тексту */}
      <div className="site-header">
        <Link href="/"><ScrambleText className="typo-nav">НАЗАД</ScrambleText></Link>
      </div>

      {/* Контент */}
      <div className="main-content sandbox-main" style={{ paddingTop: "20vh" }}>

        {/* Карточка 1 — трекер времени, лево */}
        <div className="sandbox-card align-left">
          <ImageReveal className="case-card-image">
            <img src={images.sandbox.one} alt="" className="w-full h-full object-cover" />
          </ImageReveal>
          <p className="sandbox-card-text">Был сильно недоволен трекером времени, которым пользовался — решил сделать свой. В&nbsp;нём можно задать, сколько времени нужно уделять тому или иному проекту.</p>
        </div>

        {/* Карточка 2 — свой продукт, право */}
        <div className="sandbox-card align-right">
          <ImageReveal className="case-card-image">
            <img src={images.sandbox.two} alt="" className="w-full h-full object-cover" />
          </ImageReveal>
          <p className="sandbox-card-text">Делаю свой продукт. Дошёл до прототипирования и тестирования. Давал задачи по прототипу AI-пользователям, получил фидбек от них — буду дорабатывать.</p>
        </div>

        {/* Карточка 3 — айдентика, лево */}
        <div className="sandbox-card align-left">
          <ImageReveal className="case-card-image">
            <img src={images.sandbox.three} alt="" className="w-full h-full object-cover" />
          </ImageReveal>
          <p className="sandbox-card-text">Сделал концепт айдентики для студии 3D-визуализации промышленного оборудования.</p>
        </div>

        {/* Карточка 4 + описание — грид, как на главной */}
        <div className="case-info-grid" style={{ marginTop: 0 }}>
          <div className="sandbox-card sandbox-grid-card">
            <ImageReveal className="case-card-image">
              <img src={images.sandbox.four} alt="" className="w-full h-full object-cover" />
            </ImageReveal>
            <p className="sandbox-card-text">Иногда рисую 3D-сцены в&nbsp;Cinema4D.</p>
          </div>

          <div className="info-section">
            <p className="typo-body1 text-primary">
              Продуктовый дизайнер. Есть опыт во&nbsp;фронтенде и&nbsp;создании бренда.
              Открыт к&nbsp;фулл-тайм предложениям и&nbsp;фрилансу.
            </p>
            <a
              href="https://t.me/Nikita_Fendrikov"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              <ScrambleText className="typo-nav">TG: NIKITA_FENDRIKOV</ScrambleText>
            </a>
          </div>
        </div>

      </div>

      {/* Футер */}
      <nav className="site-nav">
        <a
          href="/Фендриков. Продуктовый дизайнер. Резюме.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          <ScrambleText className="typo-nav">РЕЗЮМЕ</ScrambleText>
        </a>
        <div className="nav-dot" />
        <Link href="/">
          <ScrambleText className="typo-nav">КЕЙСЫ</ScrambleText>
        </Link>
      </nav>
    </main>
  );
}
