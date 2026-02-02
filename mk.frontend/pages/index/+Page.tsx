/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

import { useLanguage } from "@/contexts/LanguageContext";
import PaginationControls from "@/components/PaginationControls";
import WorkCard from "@/components/WorkCard";
import { styles } from "@/styles/styles";
import { useIsMobile } from "@/lib/utils";
import Header from "@/components/Header";
import { dummyWorks } from "@/data/dummyData";
import { Work } from "@/types";

// --- Types ---

const Page = () => {
  const [works, setWorks] = useState<Work[]>([]);

  const ITEMS_PER_PAGE = 6;
  const CLIENT_SIDE_THRESHOLD = 2; // Pages 1 & 2 are client-side

  // State to hold all works we have fetched so far
  const [allWorks, setAllWorks] = useState(
    works.slice(0, ITEMS_PER_PAGE * CLIENT_SIDE_THRESHOLD),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (targetPage: number) => {
    const ITEMS_PER_PAGE = 6;
    const FETCH_BATCH_SIZE = 60; // Fetch 10 pages worth of data at once

    // 1. Check if the target page's data already exists in our state
    // Example: Page 3 needs items at index 12-17.
    // If allWorks.length is 12, we don't have it.
    const startIndex = (targetPage - 1) * ITEMS_PER_PAGE;

    if (allWorks.length > startIndex) {
      setCurrentPage(targetPage);
      return;
    }

    // 2. Fetch the next "Chunk" (the next 12 items)
    setIsLoading(true);

    // Simulate Network Latency
    await new Promise((res) => setTimeout(res, 1500));

    // Logic: Start slicing from where our current array ends
    // and take the next 12 items (2 pages)
    const nextBatchStart = allWorks.length;
    const nextBatchEnd = allWorks.length + FETCH_BATCH_SIZE;

    const backendItems = works.slice(nextBatchStart, nextBatchEnd);

    // Update state: append new items and move to the target page
    setAllWorks([...allWorks, ...backendItems]);
    setCurrentPage(targetPage);
    setIsLoading(false);
  };

  // Logic to get the 6 items for the current view
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleWorks = allWorks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();

  const isDark = theme === "dark";

  const IsMobile = useIsMobile();

  // Dynamic Colors based on Context
  const colors = {
    bg: isDark ? "#050505" : "#f9f9f9",
    text: isDark ? "#ffffff" : "#111111",
    subtext: isDark ? "#888888" : "#666666",
    border: isDark ? "#444444" : "#999999",
    accent: "#6366f1",
  };

  useEffect(() => {
    const callAPI1 = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        console.time("Root Data Fetch");
        const works = dummyWorks.map((work) => ({
          ...work,
          createdOn: new Date(work.createdOn),
          updatedOn: new Date(work.updatedOn),
        }));

        setWorks(works);
        console.log(works);
        console.log(import.meta.env.PUBLIC_ENV_BACKEND_URL);
        console.timeEnd("Root Data Fetch");
        // You may want to do setState here as well
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // do something when you encounter errors
      }
    };

    callAPI1();

    // RANDOM DATA
  }, []);

  useEffect(() => {
    setAllWorks(works.slice(0, ITEMS_PER_PAGE * CLIENT_SIDE_THRESHOLD));
  }, [works]);

  return (
    <div
      style={{
        ...styles.container,
        color: colors.text,
      }}
    >
      <style>{globalCSS(colors)}</style>

      {/* --- Navigation --- */}
      <Header />

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
            <img
              src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&q=80&w=800"
              alt="Me"
              style={styles.profileImg}
            />
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
        </div>

        <div style={{ margin: "0 0 50px" }}>
          <PaginationControls
            currentPage={currentPage}
            isLoading={isLoading}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            totalCount={works.length}
          />
        </div>

        <div style={styles.grid}>
          {isLoading
            ? // Show 6 Skeletons while the "Backend" is fetching
              Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <div key={i}>
                  <div style={styles.skeletonStyleContainer} />
                  <div style={styles.skeletonStyleTitle} />
                </div>
              ))
            : // Show the real cards
              visibleWorks.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
        </div>
        {IsMobile ? (
          <div style={{ margin: "50px 0 0" }}>
            <PaginationControls
              currentPage={currentPage}
              isLoading={isLoading}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              totalCount={works.length}
            />
          </div>
        ) : null}
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

export default Page;
