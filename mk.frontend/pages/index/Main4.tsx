/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

import logoUrl from "../../assets/logo.ico";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "vike-react/useData";
import { Data } from "./+data.client";
import { convertToEmbedUrl } from "@/lib/utils";
// --- i18n Configuration ---

// --- Types ---
type Category = "All" | "Graphic" | "Video" | "3D";

interface Project {
  id: number;
  title: string;
  category: Category;
  color: string;
  image: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Cyber-Branding",
    category: "Graphic",
    color: "#6366f1",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800",
  },
  {
    id: 2,
    title: "Editorial Cut",
    category: "Video",
    color: "#ec4899",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800",
  },
  {
    id: 3,
    title: "Character Sculpt",
    category: "3D",
    color: "#8b5cf6",
    image:
      "https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?q=80&w=800",
  },
  {
    id: 4,
    title: "Kinetic Type",
    category: "Graphic",
    color: "#10b981",
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800",
  },
  {
    id: 5,
    title: "Short Film FX",
    category: "Video",
    color: "#f59e0b",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800",
  },
  {
    id: 6,
    title: "Abstract Mesh",
    category: "3D",
    color: "#3b82f6",
    image:
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800",
  },
];

const Portfolio = () => {
  const { works } = useData<Data>() || { works: [] };

  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const isDark = theme === "dark";
  const isArabic = language === "ar";

  // Dynamic Colors based on Context
  const colors = {
    bg: isDark ? "#050505" : "#f9f9f9",
    text: isDark ? "#ffffff" : "#111111",
    subtext: isDark ? "#888888" : "#666666",
    border: isDark ? "#444444" : "#999999",
    accent: "#6366f1",
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      <style>{globalCSS(colors)}</style>

      {/* --- Navigation --- */}
      <nav
        style={{
          ...styles.nav,
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: `${colors.bg}dd`,
        }}
      >
        <div style={styles.logo}>
          <img src={logoUrl} alt="logo" height="40" width="40" />
        </div>
        <div style={styles.navLinks}>
          <button
            aria-label="Theme-toggle"
            aria-description="Theme-toggle"
            onClick={toggleTheme}
            style={styles.iconBtn}
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391l-19.9 107.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391L13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256L2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121l19.9-107.9c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1l90.3-62.3c4.5-3.1 10.2-3.7 15.2-1.6M160 256a96 96 0 1 1 192 0a96 96 0 1 1-192 0m224 0a128 128 0 1 0-256 0a128 128 0 1 0 256 0"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="32"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M223.5 32C100 32 0 132.3 0 256s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                />
              </svg>
            )}
          </button>
          <button
            aria-label="Language-toggle"
            aria-description="Language-toggle"
            onClick={toggleLanguage}
            style={styles.languageBtn}
          >
            {isArabic ? "E" : "ض"}
          </button>

          {/* <select
            onChange={(e) => changeLanguage(e.target.value)}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
          <a href="#work" style={{ ...styles.navLink, color: colors.subtext }}>
            {t("nav.work")}
          </a>
          <button
            style={{
              ...styles.contactBtn,
              backgroundColor: colors.text,
              color: colors.bg,
            }}
          >
            {t("nav.contact")}
          </button>
           */}
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main style={styles.hero}>
        <div style={styles.visualStack}>
          {/* 3D Cube */}
          <div className="scene">
            <div className="cube">
              {["3D", "3D", "3D", "3D", "", ""].map((txt, i) => (
                <div
                  key={i}
                  className={`face f${i}`}
                  style={{ borderColor: colors.border }}
                >
                  {txt}
                </div>
              ))}
            </div>
          </div>

          {/* Video Strip */}
          <div
            className="video-strip-container"
            style={{ borderColor: colors.border }}
          >
            <div className="film-strip">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="frame"
                  style={{ borderColor: colors.bg }}
                />
              ))}
            </div>
            <div className="playhead" />
          </div>

          {/* Motion Orbit */}
          <div className="motion-orbit">
            <div className="ring" style={{ borderColor: colors.border }} />
            <div className="dot" style={{ backgroundColor: colors.accent }} />
          </div>
        </div>

        <h1
          style={{
            ...styles.heroTitle,
            fontSize:
              language === "en"
                ? "clamp(3rem, 10vw, 6rem)"
                : "clamp(4rem, 12vw, 7rem)",
          }}
        >
          {t("hero.title")} <br />
          <span className="gradient-text">{t("hero.span")}</span>
        </h1>
        <p style={{ ...styles.heroSub, color: colors.subtext }}>
          {t("hero.sub")}
        </p>
      </main>

      {/* --- About --- */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <div style={styles.imageContainer}>
            <img src="" alt="Me" style={styles.profileImg} />
            <div className="img-glow" />
          </div>
          <div>
            <h2 style={styles.sectionTitle}>{t("about.title")}</h2>
            <p style={{ ...styles.p, color: colors.subtext }}>
              {t("about.bio")}
            </p>
          </div>
        </div>
      </section>
      <section id="work" style={styles.workSection}>
        <div style={styles.filterHeader}>
          <h2 style={styles.sectionTitleCenter}>{t("work.title")}</h2>
          {/* <div style={styles.filterGroup}>
            {(["All", "Graphic", "Video", "3D"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  ...styles.filterBtn,
                  color: filter === cat ? "#fff" : "#666",
                  borderColor: filter === cat ? "#fff" : "transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>

        <div style={styles.grid}>
          {works.map((work) => (
            <div key={work.id} className="card">
              {work.type === "video" ? (
                <>
                  <div
                    style={{
                      ...styles.cardImage,
                      // backgroundImage: `url(${work.publicWorkMediaUrl})`,
                    }}
                  >
                    {convertToEmbedUrl(work.publicWorkMediaUrl) ? (
                      <iframe
                        style={{ width: "100%", height: "100%" }}
                        src={convertToEmbedUrl(work.publicWorkMediaUrl)!}
                      ></iframe>
                    ) : (
                      "No preview"
                    )}

                    {/* <div
                      className="card-overlay"
                      style={{
                        background: `linear-gradient(to top, #343434, transparent)`,
                      }}
                    >
                      <span style={styles.tag}>{work.type}</span>
                    </div> */}
                  </div>
                  <h3 style={styles.cardTitle}>{work.title}</h3>
                </>
              ) : (
                <>
                  <div
                    style={{
                      ...styles.cardImage,
                      backgroundImage: `url(${work.publicWorkMediaUrl})`,
                    }}
                  >
                    <div
                      className="card-overlay"
                      style={{
                        background: `linear-gradient(to top, #343434, transparent)`,
                      }}
                    >
                      <span style={styles.tag}>{work.type}</span>
                    </div>
                  </div>
                  <h3 style={styles.cardTitle}>{work.title}</h3>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* --- Footer --- */}
      <footer
        style={{ ...styles.footer, borderTop: `1px solid ${colors.border}` }}
      >
        <p>{t("hero.span")} © 2026</p>
      </footer>
    </div>
  );
};

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    transition: "background-color 0.5s ease, color 0.5s ease",
    fontFamily: "Inter, sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1.5rem 5%",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000,
    boxSizing: "border-box",
    backdropFilter: "blur(10px)",
  },
  navLinks: { display: "flex", gap: "1.5rem", alignItems: "center" },
  logo: {
    fontWeight: 900,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navLink: { textDecoration: "none", fontSize: "0.8rem", fontWeight: 600 },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  languageBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "2rem",
    fontFamily: "tajawal",
  },
  select: {
    background: "none",
    border: "none",
    color: "inherit",
    fontWeight: "bold",
    cursor: "pointer",
  },
  contactBtn: {
    border: "none",
    padding: "0.5rem 1rem",
    fontWeight: 700,
    borderRadius: "4px",
    cursor: "pointer",
  },
  hero: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  visualStack: {
    display: "flex",
    gap: "3rem",
    marginBottom: "3rem",
    scale: "0.7",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  heroTitle: {
    textJustify: "inter-word",
    fontSize: "clamp(3rem, 10vw, 6rem)",
    fontWeight: 900,
    lineHeight: 1,
    margin: 0,
  },
  heroSub: {
    marginTop: "1.5rem",
    fontSize: "0.7rem",
    fontWeight: 700,
  },
  aboutSection: { padding: "10rem 10%" },
  aboutContent: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "4rem",
    alignItems: "center",
  },
  imageContainer: { position: "relative" },
  profileImg: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "20px",
    zIndex: 2,
    position: "relative",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "1.5rem",
  },
  sectionTitleCenter: {
    width: "100%",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "1.5rem",
  },
  p: { lineHeight: 1.8, fontSize: "1.1rem" },
  footer: {
    padding: "4rem",
    textAlign: "center",
    fontSize: "0.8rem",
    opacity: 0.5,
  },

  workSection: { padding: "5rem 5%" },
  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "4rem",
    flexWrap: "wrap",
    gap: "2rem",
  },
  filterGroup: { display: "flex", gap: "1rem" },
  filterBtn: {
    background: "none",
    border: "none",
    borderBottom: "2px solid",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: 700,
    transition: "0.3s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "3rem",
  },
  cardImage: {
    height: "400px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
  },
  tag: {
    background: "#fff",
    color: "#000",
    padding: "4px 12px",
    borderRadius: "50px",
    fontSize: "0.7rem",
    fontWeight: 900,
    position: "absolute",
    bottom: "20px",
    left: "20px",
  },
  cardTitle: { marginTop: "1.5rem", fontSize: "1.2rem", fontWeight: 700 },
};

const globalCSS = (c: any) => `
  @keyframes rotateCube { from { transform: rotateX(0deg) rotateY(0deg); } to { transform: rotateX(360deg) rotateY(360deg); } }
  .scene { width: 120px; height: 120px; perspective: 600px; }
  .cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; animation: rotateCube 10s infinite linear; }
  .face { position: absolute; width: 120px; height: 120px; border: 1px solid; display: flex; align-items: center; justify-content: center; font-weight: 900; background: rgba(128,128,128,0.05); }
  .f0 { transform: translateZ(60px); } .f1 { transform: rotateY(180deg) translateZ(60px); }
  .f2 { transform: rotateY(90deg) translateZ(60px); } .f3 { transform: rotateY(-90deg) translateZ(60px); }
  .f4 { transform: rotateX(90deg) translateZ(60px); } .f5 { transform: rotateX(-90deg) translateZ(60px); }

  .video-strip-container { direction: ltr; width: 120px; height: 120px; border: 1px solid; position: relative; overflow: hidden; display: flex; align-items: center; }
  .film-strip { display: flex; gap: 5px; animation: slide 3s infinite linear; }
  .frame { min-width: 80px; height: 60px; border: 3px solid; background: ${c.accent}22; }
  @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-85px); } }
  .playhead { position: absolute; left: 50%; width: 2px; height: 100%; background: #ff0055; z-index: 5; }

  .motion-orbit { width: 120px; height: 120px; position: relative; display: flex; align-items: center; justify-content: center; }
  .ring { position: absolute; border: 1px solid; border-radius: 50%; width: 100%; height: 100%; animation: pulse 2s infinite; }
  .dot { width: 15px; height: 15px; border-radius: 50%; animation: bounce 2s infinite ease-in-out; }

  @keyframes pulse { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.2); opacity: 0; } }
  @keyframes bounce { 0%, 100% { transform: translateY(-15px); } 50% { transform: translateY(15px); } }

  .gradient-text { background: linear-gradient(90deg, ${c.accent}, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .img-glow { position: absolute; inset: -10px; background: ${c.accent}; filter: blur(30px); opacity: 0.15; z-index: 1; }
  
  @keyframes pulse { 0% { transform: scale(0.2); opacity: 1; } 100% { transform: scale(1.2); opacity: 0; } }
  @keyframes bounce { 0%, 100% { transform: translateY(-20px) scale(0.8); } 50% { transform: translateY(20px) scale(1.2); } }

  /* Utilities */
  .card { cursor: pointer; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .card:hover { transform: translateY(-10px) scale(1.02); }
  .card-overlay { position: absolute; inset: 0; opacity: 0; transition: 0.3s; }
  .card:hover .card-overlay { opacity: 1; }
  .img-glow { position: absolute; inset: -20px; background: linear-gradient(45deg, #6366f1, #ec4899); filter: blur(40px); opacity: 0.2; z-index: 1; }
  
  html { scroll-behavior: smooth; }
  body { margin: 0; padding: 0; }
`;

export default Portfolio;
