/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, PointerEvent, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { dummyWorks } from "@/data/dummyData";
import { Work } from "@/types";
// import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import Header from "@/components/Header";
import { navigate } from "vike/client/router";
import { useTranslation } from "react-i18next";
import { convertToEmbedUrl } from "@/lib/utils";
import { styles } from "@/styles/styles";

const WorkDetail = () => {
  const { theme } = useTheme();
  const { routeParams } = usePageContext();
  const { t } = useTranslation();
  // Viewer State
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";
  const colors = {
    bg: isDark ? "#050505" : "#f9f9f9",
    text: isDark ? "#ffffff" : "#111111",
    accent: "#6366f1", // Purple
    secondary: "#ec4899", // Pinkish accent
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
      // Simulate API call to your backend
      // const response = await fetch(`/api/works/${routeParams.id}`);
      // if (!response.ok) throw new Error("Not found");
      // const data = await response.json();

      const data = dummyWorks
        .map((w) => {
          return {
            ...w,
            createdOn: new Date(w.createdOn),
            updatedOn: new Date(w.updatedOn),
          };
        })
        .find((w) => w.id === Number(routeParams.id)) as Work;
      setWork(data ?? null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!work)
    return (
      <div style={{ color: "red", padding: "100px" }}>Project not found.</div>
    );

  if (error || !work) return <div>not found</div>;

  // Unified Pointer Handler (Mouse & Touch)
  const handlePointerMove = (e: PointerEvent) => {
    if (!isZoomed || !containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Calculate percentage based on pointer location
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Constrain to 0-100%
    setPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <>
      <Header />
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

          {loading ? (
            <div
              style={{
                width: "min(100%, 700px)",
                zIndex: 2,
              }}
            >
              <div style={styles.skeletonStyleContainer} />
              <div style={styles.skeletonStyleTitle} />
            </div>
          ) : (
            <>
              {/* --- DYNAMIC MEDIA VIEWER --- */}
              <div className="viewer-wrapper">
                {work.type === "video" ? (
                  <div className="video-aspect-ratio">
                    <iframe
                      src={convertToEmbedUrl(work.publicWorkMediaUrl) ?? ""}
                      title={work.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div
                    ref={containerRef}
                    className={`media-box ${isZoomed ? "is-zoomed" : ""}`}
                    onPointerMove={handlePointerMove}
                    onPointerDown={(e) => {
                      // For mobile: allow tap to zoom.
                      // We use pointerDown to ensure it feels responsive.
                      if (e.pointerType === "touch") toggleZoom();
                    }}
                    onClick={() => {
                      // For desktop: standard click
                      toggleZoom();
                    }}
                  >
                    <img
                      src={work.publicWorkMediaUrl}
                      alt={work.title}
                      className="zoomable-image"
                      draggable={false} // Prevents ghost image during drag
                    />

                    <div className="ui-overlay">
                      <span className="zoom-indicator">
                        {isZoomed ? "Tap to close" : "Tap to inspect"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {/* Hero Info */}
              <header style={localStyles.header}>
                <h1 className="title-display">{work.title}</h1>
                <p className="description-text">{work.description}</p>
              </header>
              {/* Technical Details */}
              <footer style={localStyles.footerGrid}>
                <div className="detail-col">
                  <label>{t("details.date")}</label>
                  <div>{work.createdOn.toLocaleDateString()}</div>
                </div>
                {/* <div className="detail-col">
            <label>Software</label>
            <div>
              {work.toolsIds.map(t => <img src={t.}/>)}
              </div>
          </div>
            */}
              </footer>
            </>
          )}
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
  .title-display { font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 900; margin: 0 0 20px; letter-spacing: -3px; line-height: 1; }
  .description-text { font-size: 1.2rem; max-width: 700px; opacity: 0.7; line-height: 1.6; }

  .viewer-wrapper { 
    background: ${c.card}; 
    border-radius: 40px; 
    overflow: hidden; 
    box-shadow: 0 30px 90px rgba(0,0,0,0.2);
    border: 1px solid rgba(128,128,128,0.1);
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

// import React, { useState, useRef, MouseEvent, useEffect } from "react";
// import { useData } from "vike-react/useData";
// import { useTheme } from "@/contexts/ThemeContext";
// import { usePageContext } from "vike-react/usePageContext";
// import { dummyWorks } from "@/data/dummyData";
// import { Work } from "@/types";
// import { useTranslation } from "react-i18next";

// const WorkDetail = () => {
//   const { theme } = useTheme();
//   const { routeParams } = usePageContext();
//   const { t } = useTranslation();
//   // Viewer State
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [work, setWork] = useState<Work | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const containerRef = useRef<HTMLDivElement>(null);

//   const isDark = theme === "dark";
//   const colors = {
//     bg: isDark ? "#050505" : "#f9f9f9",
//     text: isDark ? "#ffffff" : "#111111",
//     accent: "#6366f1", // Purple
//     secondary: "#ec4899", // Pinkish accent
//     card: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
//   };

//   useEffect(() => {
//     if (!work) {
//       fetchWork();
//     }
//   }, [routeParams.id]);

//   const fetchWork = async () => {
//     try {
//       setLoading(true);
//       // Simulate API call to your backend
//       // const response = await fetch(`/api/works/${routeParams.id}`);
//       // if (!response.ok) throw new Error("Not found");
//       // const data = await response.json();

//       const data = dummyWorks
//         .map((w) => {
//           return {
//             ...w,
//             createdOn: new Date(w.createdOn),
//             updatedOn: new Date(w.updatedOn),
//           };
//         })
//         .find((w) => w.id === Number(routeParams.id)) as Work;
//       setWork(data ?? null);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!work)
//     return (
//       <div style={{ color: "red", padding: "100px" }}>Project not found.</div>
//     );

//   if (loading) return <div>loading</div>;
//   if (error || !work) return <div>not found</div>;
//   // Handle Mouse Movement for Zoom Pan
//   const handleMouseMove = (e: MouseEvent) => {
//     if (!isZoomed || !containerRef.current) return;
//     const { left, top, width, height } =
//       containerRef.current.getBoundingClientRect();
//     const x = ((e.pageX - left) / width) * 100;
//     const y = ((e.pageY - top) / height) * 100;
//     setPosition({ x, y });
//   };

//   return (
//     <div
//       style={{
//         ...localStyles.container,
//         backgroundColor: colors.bg,
//         color: colors.text,
//       }}
//     >
//       <style>{detailCSS(colors, isZoomed, position)}</style>

//       <div style={localStyles.contentWrapper}>
//         {/* Navigation Back */}
//         <a href="/#work" className="back-btn">
//           <span>←</span> Back to Portfolio
//         </a>

//         {/* Header Info */}
//         <header style={localStyles.header}>
//           <h1 className="work-title">{work.title}</h1>
//           <p className="work-desc">{work.description}</p>
//         </header>

//         {/* --- MAIN VIEWER --- */}
//         <div className="viewer-card">
//           {work.type === "video" ? (
//             <div className="video-container">
//               <iframe
//                 src={work.publicWorkMediaUrl}
//                 title={work.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
//           ) : (
//             <div
//               ref={containerRef}
//               className={`image-container ${isZoomed ? "zoomed" : ""}`}
//               onClick={() => setIsZoomed(!isZoomed)}
//               onMouseMove={handleMouseMove}
//               onMouseLeave={() => !isZoomed && setPosition({ x: 50, y: 50 })}
//             >
//               <img
//                 src={work.publicWorkMediaUrl}
//                 alt={work.title}
//                 className="main-asset"
//                 loading="eager"
//               />
//               {!isZoomed && (
//                 <div className="zoom-hint">Click to inspect details</div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Project Meta Info */}
//         <div style={localStyles.metaBox}>
//           {" "}
//           <div className="meta-item">
//             <span className="label">{t("details.date")}</span>
//             <span className="value">{work.createdOn.toDateString()}</span>{" "}
//           </div>{" "}
//           <div className="meta-item">
//             <span className="label">{t("details.tools")}</span>
//             <span className="value">Ps, Ai, Figma</span>{" "}
//           </div>{" "}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Styles ---

// const localStyles: Record<string, React.CSSProperties> = {
//   container: {
//     minHeight: "100vh",
//     padding: "120px 20px 60px",
//     transition: "background 0.3s",
//   },
//   contentWrapper: { maxWidth: "1100px", margin: "0 auto" },
//   header: { marginBottom: "50px" },
//   metaGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "30px",
//     marginTop: "50px",
//     paddingTop: "30px",
//     borderTop: "1px solid rgba(128,128,128,0.2)",
//   },
// };

// const detailCSS = (
//   c: any,
//   isZoomed: boolean,
//   pos: { x: number; y: number },
// ) => `
//   .back-btn { text-decoration: none; color: ${c.accent}; font-weight: 500; display: flex; align-items: center; gap: 8px; margin-bottom: 30px; transition: 0.2s; }
//   .back-btn:hover { transform: translateX(-5px); color: ${c.secondary}; }

//   .badge { display: inline-block; padding: 6px 12px; border: 1px solid ${c.accent}; color: ${c.accent}; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; }

//   .work-title { font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 900; margin: 0 0 20px; line-height: 1.1; letter-spacing: -2px; }
//   .work-desc { font-size: 1.2rem; max-width: 600px; line-height: 1.6; opacity: 0.8; }

//   .viewer-card { background: ${c.card}; border-radius: 32px; overflow: hidden; border: 1px solid rgba(128,128,128,0.1); box-shadow: 0 40px 100px rgba(0,0,0,0.3); }

//   /* VIDEO LOGIC */
//   .video-container { position: relative; padding-bottom: 56.25%; height: 0; }
//   .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

//   /* IMAGE VIEWER LOGIC */
//   .image-container {
//     position: relative;
//     width: 100%;
//     cursor: zoom-in;
//     overflow: hidden;
//     display: flex;
//     background: #000;
//   }
//   .main-asset {
//     width: 100%;
//     height: auto;
//     display: block;
//     transition: transform 0.1s ease-out, opacity 0.3s;
//     transform-origin: ${pos.x}% ${pos.y}%;
//   }

//   .image-container.zoomed { cursor: zoom-out; }
//   .image-container.zoomed .main-asset { transform: scale(2.5); }

//   .zoom-hint {
//     position: absolute; bottom: 20px; right: 20px;
//     background: rgba(0,0,0,0.6); color: white; padding: 8px 16px;
//     border-radius: 8px; font-size: 0.8rem; backdrop-filter: blur(4px);
//     pointer-events: none; opacity: 0.7;
//   }

//   .meta-item h4 { font-size: 0.75rem; text-transform: uppercase; color: ${c.accent}; margin: 0 0 10px; letter-spacing: 2px; }
//   .meta-item p { font-size: 1.1rem; margin: 0; font-weight: 500; }

//   @media (max-width: 768px) {
//     .work-title { font-size: 2.5rem; }
//     .image-container.zoomed .main-asset { transform: scale(1.5); }
//   }
// `;

// export default WorkDetail;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import { usePageContext } from "vike-react/usePageContext";
// import { useTheme } from "@/contexts/ThemeContext";
// import { useTranslation } from "react-i18next";
// import { Work } from "@/types";
// import { dummyWorks } from "@/data/dummyData";
// import Header from "@/components/Header";

// const WorkDetail = () => {
//   const [isZoomed, setIsZoomed] = useState(false);
//   const { routeParams } = usePageContext();
//   const { theme } = useTheme();
//   const { t } = useTranslation();

//   const [work, setWork] = useState<Work | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const isDark = theme === "dark";
//   const colors = {
//     bg: isDark ? "#050505" : "#f9f9f9",
//     text: isDark ? "#ffffff" : "#111111",
//     subtext: isDark ? "#888888" : "#666666",
//     accent: "#6366f1", // Your purple/indigo accent
//     surface: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
//   };

//   useEffect(() => {
//     if (!work) {
//       fetchWork();
//     }
//   }, [routeParams.id]);

//   const fetchWork = async () => {
//     try {
//       setLoading(true);
//       // Simulate API call to your backend
//       // const response = await fetch(`/api/works/${routeParams.id}`);
//       // if (!response.ok) throw new Error("Not found");
//       // const data = await response.json();

//       const data = dummyWorks
//         .map((w) => {
//           return {
//             ...w,
//             createdOn: new Date(w.createdOn),
//             updatedOn: new Date(w.updatedOn),
//           };
//         })
//         .find((w) => w.id === Number(routeParams.id)) as Work;
//       setWork(data ?? null);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <LoadingSkeleton colors={colors} />;
//   if (error || !work) return <NotFound colors={colors} />;

//   return (
//     <>
//       <Header />
//       <div
//         style={{
//           ...localStyles.container,
//           backgroundColor: colors.bg,
//           color: colors.text,
//         }}
//       >
//         <style>{detailCSS(colors, isZoomed)}</style>

//         {/* Back Button */}
//         <a
//           href="/#work"
//           className="back-link"
//           style={{ color: colors.subtext }}
//         >
//           {t("details.back")}
//         </a>

//         <div style={localStyles.contentWrapper}>
//           {/* Header Section */}
//           <header style={localStyles.header}>
//             <h1 style={localStyles.title}>{work.title}</h1>
//             <div className="accent-line" />
//           </header>

//           {/* Main Hero Image */}
//           <div className="image-main-container">
//             <img
//               src={work.publicWorkMediaUrl}
//               alt={work.title}
//               style={localStyles.mainImage}
//             />
//             <div className="purple-glow" />
//           </div>

//           {/* Info Grid */}
//           <div style={localStyles.infoGrid}>
//             <div style={localStyles.descriptionBox}>
//               <h3 style={{ color: colors.accent }}>{t("details.details")}</h3>
//               <p style={{ color: colors.subtext, lineHeight: "1.8" }}>
//                 {work.description}
//               </p>
//             </div>

//             <div style={localStyles.metaBox}>
//               <div className="meta-item">
//                 <span className="label">{t("details.date")}</span>
//                 <span className="value">{work.createdOn.toDateString()}</span>
//               </div>

//               <div className="meta-item">
//                 <span className="label">{t("details.tools")}</span>
//                 <span className="value">Ps, Ai, Figma</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // --- Sub-components & Styles ---

// const LoadingSkeleton = ({ colors }: any) => (
//   <div
//     style={{
//       ...localStyles.container,
//       backgroundColor: colors.bg,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
//     <div className="loader" />
//   </div>
// );

// const NotFound = ({ colors }: any) => (
//   <div
//     style={{
//       ...localStyles.container,
//       backgroundColor: colors.bg,
//       textAlign: "center",
//       paddingTop: "100px",
//     }}
//   >
//     <h1 style={{ color: colors.accent }}>404</h1>
//     <p style={{ color: colors.text }}>Project not found.</p>
//     <a href="/" style={{ color: colors.accent }}>
//       Return Home
//     </a>
//   </div>
// );

// const localStyles: Record<string, React.CSSProperties> = {
//   container: {
//     minHeight: "100vh",
//     padding: "100px 5% 50px",
//     transition: "0.3s",
//   },
//   contentWrapper: { maxWidth: "1200px", margin: "0 auto" },
//   header: { marginBottom: "60px", textAlign: "center" },
//   title: {
//     fontSize: "clamp(2.5rem, 6vw, 4rem)",
//     margin: "10px 0",
//     fontWeight: 900,
//   },
//   mainImage: {
//     width: "100%",
//     borderRadius: "24px",
//     display: "block",
//     position: "relative",
//     zIndex: 2,
//   },
//   infoGrid: {
//     display: "grid",
//     gridTemplateColumns: "2fr 1fr",
//     gap: "40px",
//     marginTop: "60px",
//   },
//   descriptionBox: { fontSize: "1.2rem" },
//   metaBox: {
//     padding: "30px",
//     borderRadius: "20px",
//     backgroundColor: "rgba(128,128,128,0.05)",
//     height: "fit-content",
//   },
//   gallery: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px",
//     marginTop: "20px",
//   },
// };

// const detailCSS = (c: any, isZoomed: boolean) => `    font-size: 3rem;
//   .title-gradient {
//     background: linear-gradient(45deg, ${c.accent}, #ec4899);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     margin-bottom: 10px;
//   }

//   .media-container {
//     background: ${c.text}05;
//     border-radius: 24px;
//     overflow: hidden;
//     border: 1px solid ${c.text}15;
//     box-shadow: 0 20px 40px rgba(0,0,0,0.2);
//   }

//   /* Video Aspect Ratio Hack */
//   .video-wrapper {
//     position: relative;
//     padding-bottom: 56.25%; /* 16:9 */
//     height: 0;
//   }
//   .video-wrapper iframe {
//     position: absolute;
//     top: 0; left: 0; width: 100%; height: 100%;
//   }

//   /* Image Zoom Logic */
//   .image-wrapper {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     transition: transform 0.3s ease;
//     overflow: hidden;
//   }
//   .image-wrapper img {
//     max-width: 100%;
//     transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
//   }
//   .image-wrapper.zoomed img {
//     transform: scale(1.5); /* Simple zoom - can be enhanced to follow mouse */
//   }

//   @media (max-width: 768px) {
//     .image-wrapper.zoomed img { transform: scale(1.1); }
//   }
//   .back-link { text-decoration: none; font-size: 0.9rem; margin-bottom: 20px; display: inline-block; transition: 0.2s; }
//   .back-link:hover { color: ${c.accent} !important; transform: translateX(-5px); }

//   .category-tag { color: ${c.accent}; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; margin: 0; }
//   .accent-line { width: 60px; height: 4px; background: ${c.accent}; margin: 20px auto; border-radius: 2px; }

//   .image-main-container { position: relative; }
//   .purple-glow { position: absolute; inset: 0; background: ${c.accent}; filter: blur(80px); opacity: 0.15; z-index: 1; pointer-events: none; }

//   .meta-item { margin-bottom: 20px; display: flex; flex-direction: column; }
//   .meta-item .label { font-size: 0.75rem; text-transform: uppercase; color: ${c.subtext}; letter-spacing: 1px; }
//   .meta-item .value { font-size: 1.1rem; font-weight: 500; margin-top: 5px; }

//   .gallery-img { width: 100%; border-radius: 15px; transition: 0.3s; }
//   .gallery-img:hover { transform: scale(1.02); }

//   .loader { width: 48px; height: 48px; border: 5px solid ${c.accent}33; border-bottom-color: ${c.accent}; border-radius: 50%; animation: rotation 1s linear infinite; }
//   @keyframes rotation { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }

//   @media (max-width: 768px) {
//     div[style*="infoGrid"] { grid-template-columns: 1fr; }
//     div[style*="gallery"] { grid-template-columns: 1fr; }
//   }
// `;
// export default WorkDetail;
