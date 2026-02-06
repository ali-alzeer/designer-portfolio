/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, PointerEvent, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { PageError, Work } from "@/types";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";
import { useTranslation } from "react-i18next";
import { convertToEmbedUrl } from "@/lib/utils";
import { publicApi } from "@/lib/api";
import { ENDPOINT_WORKS } from "@/constants/constants";
import ErrorPage from "@/components/ErrorPage";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";
import { constColors } from "@/styles/styles";

const WorkDetail = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { routeParams } = usePageContext();
  const { t } = useTranslation();

  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PageError | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";
  const colors = {
    bg: isDark ? "#050505" : "#f9f9f9",
    text: isDark ? "#ffffff" : "#111111",
    card: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
  };

  useEffect(() => {
    if (!work) {
      fetchWork();
    }
  }, [routeParams.id]);

  const fetchWork = async () => {
    try {
      setLoading(true);
      const res = await publicApi.get(`${ENDPOINT_WORKS}/${routeParams.id}`);
      if (!res.data.success) {
        if (res.data.statusCode == "404") {
          setError({
            errorMessage: t("error.pageNotFound"),
            statusCode: "404",
          });
        } else {
          setError({ errorMessage: t("error.serverError"), statusCode: "500" });
        }
      } else {
        setError(null);
      }
      setWork(res.data.data ?? null);
    } catch (err: any) {
      setWork(null);
      if (err.response.data.statusCode == "404") {
        setError({
          errorMessage: t("error.pageNotFound"),
          statusCode: "404",
        });
      } else {
        setError({ errorMessage: t("error.serverError"), statusCode: "500" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isZoomed || !containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const toggleZoom = () => setIsZoomed(!isZoomed);

  if (error) {
    return (
      <ErrorPage
        errorMessage={error.errorMessage}
        statusCode={error.statusCode}
      />
    );
  }
  if (loading) {
    return <Loader color={constColors.accent} fullscreen={true} size="large" />;
  }
  if (!work) {
    return (
      <ErrorPage errorMessage={t("error.pageNotFound")} statusCode={"404"} />
    );
  }

  return (
    <>
      <div
        style={{
          ...localStyles.container,
          color: colors.text,
        }}
      >
        <style>{detailCSS(colors, position)}</style>
        <div style={localStyles.contentWrapper}>
          {/* Navigation */}
          <nav style={localStyles.topNav}>
            <button
              type="button"
              onClick={() => navigate("/#work")}
              className="back-link"
            >
              {t("details.back")}
            </button>
          </nav>

          <>
            {/* --- DYNAMIC MEDIA VIEWER --- */}
            <div className="viewer-wrapper">
              {work.type === "video" ? (
                <iframe
                  style={{
                    width: "100%",
                    height: "400px",
                    border: "none",
                  }}
                  src={convertToEmbedUrl(work.publicWorkMediaUrl) ?? ""}
                />
              ) : (
                // <div className="video-aspect-ratio">

                // </div>
                <div
                  ref={containerRef}
                  className={`media-box ${isZoomed ? "is-zoomed" : ""}`}
                  onPointerMove={handlePointerMove}
                  onPointerDown={(e) => {
                    if (e.pointerType === "touch") toggleZoom();
                  }}
                  onClick={() => {
                    toggleZoom();
                  }}
                >
                  <img
                    src={work.publicWorkMediaUrl}
                    alt={language === "en" ? work.titleEn : work.titleAr}
                    className="zoomable-image"
                    draggable={false}
                  />

                  <div className="ui-overlay">
                    <span className="zoom-indicator">
                      {isZoomed ? t("tap.close") : t("tap.inspect")}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Hero Info */}
            <header style={localStyles.header}>
              <h1 className="title-display">
                {language === "en" ? work.titleEn : work.titleAr}
              </h1>
              <p className="description-text">
                {language === "en" ? work.descriptionEn : work.descriptionAr}
              </p>
            </header>
            {/* Technical Details */}
            <footer style={localStyles.footerGrid}>
              <div className="detail-col">
                <h2>{t("details.tools")}</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    textAlign: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {work.tools.map((t) => {
                    return (
                      <div
                        key={t.id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          padding: "10px",
                          borderColor: constColors.accent,
                          borderWidth: "1px",
                          background: "none",
                          borderRadius: "5px",
                          direction: "ltr",
                          textAlign: "center",
                          height: "110px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            width="70"
                            height="70"
                            src={t.publicToolImageUrl}
                          />
                        </div>

                        <p
                          style={{
                            textOverflow: "ellipsis",
                            maxWidth: "80px",
                            width: "80px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            fontSize: "12px",
                          }}
                        >
                          {t.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </footer>
          </>
        </div>
      </div>
    </>
  );
};

// --- Styles & CSS ---

const localStyles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    padding: "80px 20px",
    transition: "0.4s ease",
  },
  contentWrapper: { maxWidth: "700px", margin: "0 auto" },
  topNav: { marginBottom: "40px" },
  header: { margin: "60px 0" },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "40px",
    marginTop: "60px",
    padding: "40px 0",
    borderTop: "1px solid rgba(128,128,128,0.1)",
  },
};

const detailCSS = (c: any, pos: { x: number; y: number }) => `
  .back-link { cursor:pointer; display: flex; align-items: center; gap: 10px; text-decoration: none; color: ${c.text}; opacity: 0.6; transition: 0.3s; font-weight: 500; }
  .back-link:hover { opacity: 1; color: ${c.accent}; }

  .category-label { color: ${c.accent}; text-transform: uppercase; font-size: 0.8rem; font-weight: 800; letter-spacing: 3px; display: block; margin-bottom: 10px; }
  .title-display { font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 900; margin: 0 0 20px; letter-spacing: -3px; line-height: 1.4; }
  .description-text { font-size: 1.2rem; max-width: 700px; opacity: 0.7; line-height: 1.6; }

  .viewer-wrapper { 
    background: ${c.card}; 
    border-radius: 40px; 
    overflow: hidden; 
    box-shadow: 0 30px 90px rgba(0,0,0,0.2);
    border: 1px solid rgba(128,128,128,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Video Handling */
  .video-aspect-ratio { position: relative; padding-bottom: 56.25%; height: 0; }
  .video-aspect-ratio iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

  /* Touch-Ready Image Viewer */
  .media-box { 
    position: relative; 
    max-width: 700px;
    width: 100%; 
    overflow: hidden; 
    cursor: zoom-in;
    touch-action: none; /* Crucial: Prevents page scroll when dragging the image */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .zoomable-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.2s cubic-bezier(0.2, 0, 0.2, 1);
    transform-origin: ${pos.x}% ${pos.y}%;
    pointer-events: none; /* Let the container handle the pointers */
  }

  .media-box.is-zoomed { cursor: zoom-out; }
  .media-box.is-zoomed .zoomable-image {
    transform: scale(2.5);
  }

  .ui-overlay {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .zoom-indicator {
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    color: white;
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 0.8rem;
    white-space: nowrap;
    opacity: 0.8;
  }

  .detail-col label { font-size: 0.7rem; text-transform: uppercase; color: ${c.accent}; font-weight: 800; display: block; margin-bottom: 8px; }
  .detail-col div { font-size: 1.1rem; font-weight: 500; }

  @media (max-width: 768px) {
    .title-display { font-size: 2.8rem; }
    .media-box.is-zoomed .zoomable-image { transform: scale(1.8); } /* Slightly less zoom on mobile */
    .viewer-wrapper { border-radius: 20px; }
  }
`;

export default WorkDetail;
