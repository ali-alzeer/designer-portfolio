/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

import { useLanguage } from "@/contexts/LanguageContext";
import PaginationControls from "@/components/PaginationControls";
import WorkCard from "@/components/WorkCard";
import { constColors, styles } from "@/styles/styles";
import { useIsMobile } from "@/lib/utils";
import { ContactInfo, Work } from "@/types";
import { publicApi } from "@/lib/api";
import {
  ENDPOINT_AUTH_MAINIMAGE,
  ENDPOINT_CONTACTINFO,
  ENDPOINT_WORKS,
  ITEMS_PER_PAGE,
  ITEMS_PER_PAGE_INIT,
} from "@/constants/constants";
import DEFAULT_IMAGE_FOR_DESIGNER from "@/assets/default_designer.webp";

const Page = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();

  const [mainImageUrl, setMaimImageUrl] = useState<string>(
    DEFAULT_IMAGE_FOR_DESIGNER,
  );

  const handleMediaError = () => {
    setMaimImageUrl(DEFAULT_IMAGE_FOR_DESIGNER);
  };

  const IsMobile = useIsMobile();
  const isDark = theme === "dark";
  const colors = {
    bg: isDark ? "#050505" : "#f9f9f9",
    text: isDark ? "#ffffff" : "#111111",
    subtext: isDark ? "#888888" : "#666666",
    border: isDark ? "#444444" : "#999999",
    accent: "#6366f1",
  };

  const [works, setWorks] = useState<Work[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [totalServerCount, setTotalServerCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleWorks = works.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const fetchCount = useCallback(async () => {
    try {
      const res = await publicApi.get(`${ENDPOINT_WORKS}/count`);
      if (res.data.success) {
        setTotalServerCount(res.data.data);
      }
    } catch (err) {
      setTotalServerCount(0);
      console.error("Failed to fetch count", err);
    }
  }, []);

  const fetchMainImage = useCallback(async () => {
    try {
      const res = await publicApi.get(ENDPOINT_AUTH_MAINIMAGE);
      if (res.data.success) {
        setMaimImageUrl(res.data.data);
      }
    } catch (err) {
      setMaimImageUrl(DEFAULT_IMAGE_FOR_DESIGNER);
      console.error("Failed to fetch main image", err);
    }
  }, []);

  const fetchContactInfo = useCallback(async () => {
    try {
      const res = await publicApi.get(ENDPOINT_CONTACTINFO);
      if (res.data.success) {
        setContactInfo(res.data.data);
      }
    } catch (err) {
      setContactInfo([]);
      console.error("Failed to fetch main image", err);
    }
  }, []);

  const handlePageChange = async (
    targetPage: number,
    isFirstFetch: boolean = false,
  ) => {
    if (isLoading) return;

    const itemsNeeded = targetPage * ITEMS_PER_PAGE;

    if (works.length >= itemsNeeded) {
      setCurrentPage(targetPage);
      return;
    }

    const skip = works.length;
    let take = itemsNeeded - works.length;

    if (isFirstFetch) {
      take = ITEMS_PER_PAGE_INIT;
    }

    try {
      setIsLoading(true);
      const res = await publicApi.get(
        `${ENDPOINT_WORKS}/paged?skip=${skip}&take=${take}`,
      );

      if (res.data.success) {
        setWorks((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));

          const uniqueNewItems = res.data.data.filter(
            (newItem: any) => !existingIds.has(newItem.id),
          );

          return [...prev, ...uniqueNewItems];
        });
        setCurrentPage(targetPage);
        setError(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMainImage();
    fetchCount();
    fetchContactInfo();
    handlePageChange(1, true);
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        color: colors.text,
      }}
    >
      <style>{globalCSS(colors)}</style>
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
                ? "clamp(2rem, 10vw, 6rem)"
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
              onError={handleMediaError}
              src={mainImageUrl}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          {contactInfo.map((t) => {
            return (
              <a
                style={{ marginTop: "40px" }}
                key={t.id}
                rel="noreferrer"
                target="_blank"
                href={t.url}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "none",
                    borderRadius: "5px",
                    textAlign: "center",
                    height: "110px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <img width="50" height="50" src={t.icon} />
                  </div>
                  <div
                    style={{
                      height: "3rem",
                      position: "relative",
                    }}
                  >
                    <p
                      style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        maxWidth: "80px",
                        width: "80px",
                        fontSize: "12px",
                      }}
                    >
                      {language === "en" ? t.titleEn : t.titleAr}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
      <section id="work" style={styles.workSection}>
        <div style={styles.filterHeader}>
          <h2 style={styles.sectionTitleCenter}>{t("work.title")}</h2>
        </div>

        {error ? (
          <p
            style={{
              border: `2px solid ${constColors.accent}`,
              padding: "10px 20px",
            }}
          >
            {t("error.serverError")}
          </p>
        ) : (
          <>
            {totalServerCount > 0 ? (
              <div style={{ margin: "0 0 50px" }}>
                <PaginationControls
                  currentPage={currentPage}
                  isLoading={isLoading}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                  totalCount={totalServerCount}
                />
              </div>
            ) : null}

            <div
              style={{
                ...styles.grid,
                gridTemplateColumns: IsMobile
                  ? "1fr"
                  : "repeat(auto-fill, minmax(350px, 1fr))",
              }}
            >
              {isLoading
                ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                    <div key={i}>
                      <div style={styles.skeletonStyleContainer} />
                      <div style={styles.skeletonStyleTitle} />
                    </div>
                  ))
                : visibleWorks.map((work: Work) => (
                    <WorkCard key={work.id} work={work} />
                  ))}
            </div>
            {totalServerCount > 0 ? (
              IsMobile ? (
                <div style={{ margin: "50px 0 0" }}>
                  <PaginationControls
                    currentPage={currentPage}
                    isLoading={isLoading}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                    totalCount={totalServerCount}
                  />
                </div>
              ) : null
            ) : null}
          </>
        )}
      </section>
      {/* --- Footer --- */}
      <footer
        style={{ ...styles.footer, borderTop: `1px solid ${colors.border}` }}
      >
        <p>{t("footer.copyright1")}</p>
        <p>{t("footer.copyright2")}</p>
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
