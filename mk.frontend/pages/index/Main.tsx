// MainPage.tsx
import { useEffect, useRef, useState } from "react";

/**
 * MainPage.tsx
 * Single-file TypeScript React main page for a designer portfolio.
 *
 * Usage
 *  - Place this file in src/
 *  - Import and render <MainPage /> in App.tsx
 *  - Replace sample asset paths with your own
 */

/* -------------------------
   Types
   ------------------------- */
type ProjectType = "image" | "video" | "3d";

interface Project {
  id: string;
  title: string;
  role: string;
  thumb: string;
  images?: string[];
  video?: string;
  model?: string;
  description: string;
  year: number;
  type: ProjectType;
}

/* -------------------------
   Sample data
   Replace with real assets
   ------------------------- */
const SAMPLE_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Brand Identity System",
    role: "Graphic Design",
    thumb: "/assets/brand-thumb.jpg",
    images: ["/assets/brand-1.jpg", "/assets/brand-2.jpg"],
    description:
      "Full brand identity, print collateral, and packaging. Bold typography and tactile textures.",
    year: 2025,
    type: "image",
  },
  {
    id: "p2",
    title: "Showreel Cut",
    role: "Video Editing",
    thumb: "/assets/showreel-poster.jpg",
    video: "/assets/showreel-short.mp4",
    description:
      "A fast-paced showreel showcasing motion design, color grading, and narrative pacing.",
    year: 2025,
    type: "video",
  },
  {
    id: "p3",
    title: "3D Product Turntable",
    role: "3D Artist",
    thumb: "/assets/3d-thumb.jpg",
    model: "/assets/product.glb",
    description:
      "Interactive 3D turntable for product visualization. GLB model with PBR materials.",
    year: 2025,
    type: "3d",
  },
  {
    id: "p4",
    title: "Campaign Visuals",
    role: "Graphic Design",
    thumb: "/assets/campaign-thumb.jpg",
    images: ["/assets/campaign-1.jpg"],
    description:
      "Campaign visuals for a seasonal launch. Bold color blocking and motion-ready assets.",
    year: 2024,
    type: "image",
  },
];

/* -------------------------
   CSS injection
   ------------------------- */
const styles = `
:root{
  --bg:#0f1115;
  --card:#0f1720;
  --muted:#9aa4b2;
  --accent:#7c5cff;
  --glass: rgba(255,255,255,0.04);
  --radius:14px;
  --max-width:1200px;
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
*{box-sizing:border-box}
body{margin:0;background:linear-gradient(180deg,#07080a 0%, #0f1115 100%);color:#e6eef8;-webkit-font-smoothing:antialiased}
.main-wrap{max-width:var(--max-width);margin:48px auto;padding:28px;display:flex;flex-direction:column;gap:48px}
.header{display:flex;align-items:center;gap:20px}
.brand{display:flex;flex-direction:column;gap:4px}
.brand h2{margin:0;font-size:20px;letter-spacing:0.6px}
.brand p{margin:0;color:var(--muted);font-size:13px}
.cta-row{margin-left:auto;display:flex;gap:12px;align-items:center}
.cta-btn{background:linear-gradient(90deg,var(--accent),#5ad1ff);border:none;padding:10px 14px;border-radius:10px;color:#06101a;font-weight:700;cursor:pointer;box-shadow:0 6px 18px rgba(124,92,255,0.18);transition:transform .18s ease}
.cta-ghost{background:transparent;border:1px solid rgba(255,255,255,0.06);padding:8px 12px;border-radius:10px;color:var(--muted);cursor:pointer}
.hero{display:grid;grid-template-columns:1fr 420px;gap:28px;align-items:center}
.hero-left h1{font-size:44px;margin:0;line-height:1.02}
.hero-left p{color:var(--muted);margin-top:12px;font-size:16px;max-width:60ch}
.showreel{border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(2,6,23,0.6);background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent)}
.showreel video{width:100%;height:100%;display:block;object-fit:cover}
.meta-row{display:flex;gap:12px;margin-top:18px;align-items:center}
.badge{background:var(--glass);padding:8px 10px;border-radius:999px;color:var(--muted);font-weight:600;font-size:13px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media (max-width:1000px){.hero{grid-template-columns:1fr;}.grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:640px){.grid{grid-template-columns:1fr}.header{padding:0 8px}.main-wrap{padding:18px;margin:18px auto}}
.card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:12px;overflow:hidden;position:relative;cursor:pointer;transition:transform .28s cubic-bezier(.2,.9,.3,1), box-shadow .28s}
.card:hover{transform:translateY(-8px);box-shadow:0 30px 60px rgba(2,6,23,0.6)}
.card img, .card video{width:100%;height:220px;object-fit:cover;display:block}
.card .info{padding:12px}
.card h3{margin:0;font-size:16px}
.card p{margin:6px 0 0;color:var(--muted);font-size:13px}
.overlay-type{position:absolute;left:12px;top:12px;background:rgba(0,0,0,0.45);padding:6px 8px;border-radius:8px;color:#fff;font-weight:700;font-size:12px}
.modal-backdrop{position:fixed;inset:0;background:linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.85));display:flex;align-items:center;justify-content:center;z-index:60}
.modal{width:min(1100px,96%);max-height:86vh;background:linear-gradient(180deg, rgba(10,12,16,0.98), rgba(6,8,12,0.98));border-radius:16px;overflow:auto;padding:18px;box-shadow:0 40px 120px rgba(2,6,23,0.8)}
.modal .top{display:flex;gap:12px;align-items:center}
.modal .media{flex:1;border-radius:12px;overflow:hidden;background:#000}
.modal .meta{width:320px;padding-left:12px}
.close-btn{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--muted);padding:8px 10px;border-radius:10px;cursor:pointer}
.kv{display:flex;gap:8px;color:var(--muted);font-size:13px;margin-top:10px}
.footer{display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid rgba(255,255,255,0.02);color:var(--muted);font-size:13px}
.small{font-size:12px;color:var(--muted)}
.fade-in{animation:fadeIn .7s ease both}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
`;

/* -------------------------
   Hook to inject styles once
   ------------------------- */
function useInjectStyles(): void {
  useEffect(() => {
    if (document.getElementById("portfolio-main-styles")) return;
    const s = document.createElement("style");
    s.id = "portfolio-main-styles";
    s.innerHTML = styles;
    document.head.appendChild(s);
  }, []);
}

/* -------------------------
   Keyboard handler hook
   ------------------------- */
function useKeyClose(handler: (arg?: "next" | "prev" | undefined) => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handler();
      if (e.key === "ArrowRight") handler("next");
      if (e.key === "ArrowLeft") handler("prev");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

/* -------------------------
   Component
   ------------------------- */
export default function MainPage({
  projects = SAMPLE_PROJECTS,
}: {
  projects?: Project[];
}) {
  useInjectStyles();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches)
      document.documentElement.style.setProperty("--anim", "none");
  }, []);

  const openProject = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveIndex(null);
  };

  const navigate = (dir: "next" | "prev") => {
    if (!projects || projects.length === 0 || activeIndex === null) return;
    let next = activeIndex;
    if (dir === "next") next = (activeIndex + 1) % projects.length;
    if (dir === "prev")
      next = (activeIndex - 1 + projects.length) % projects.length;
    setActiveIndex(next);
  };

  useKeyClose((arg) => {
    if (arg === "next") navigate("next");
    else if (arg === "prev") navigate("prev");
    else closeModal();
  });

  // Lazy-load thumbnails
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const imgs = el.querySelectorAll<HTMLImageElement>("img[data-src]");
    if (!imgs.length) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || "";
            img.removeAttribute("data-src");
            obs.unobserve(img);
          }
        });
      },
      { rootMargin: "200px" },
    );
    imgs.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, [projects]);

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <main className="main-wrap fade-in" aria-live="polite">
      <header className="header" role="banner">
        <div className="brand">
          <h2>Alex Rivera</h2>
          <p>Designer • Video Editor • 3D Artist</p>
        </div>

        <div className="cta-row" role="navigation" aria-label="Primary actions">
          <button
            className="cta-ghost"
            onClick={() => {
              const el = document.getElementById("work");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Work
          </button>
          <a className="cta-btn" href="#contact" aria-label="Contact Alex">
            Hire me
          </a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-left">
          <h1 id="hero-heading">
            I design brand systems, edit cinematic motion, and craft 3D
            experiences.
          </h1>
          <p>
            I blend graphic systems, motion storytelling, and interactive 3D to
            help brands stand out. I deliver identity, showreels, and product
            visualizations that scale across screens and spaces.
          </p>

          <div className="meta-row">
            <span className="badge">Available for freelance</span>
            <span className="small">Based in Netherlands</span>
          </div>
        </div>

        <aside className="showreel" aria-hidden="false">
          <video
            src="/assets/showreel-short.mp4"
            poster="/assets/showreel-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Showreel preview"
          />
        </aside>
      </section>

      <section id="work" aria-labelledby="work-heading">
        <h3 id="work-heading" style={{ margin: "0 0 14px 0" }}>
          Selected Work
        </h3>

        <div ref={gridRef} className="grid" role="list">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="card"
              role="listitem"
              tabIndex={0}
              onClick={() => openProject(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openProject(i);
              }}
              aria-label={`${p.title}, ${p.role}, ${p.year}`}
            >
              <div className="overlay-type">{p.type.toUpperCase()}</div>

              {p.type === "video" ? (
                <video
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  poster={p.thumb}
                  style={{ height: 220, width: "100%", objectFit: "cover" }}
                >
                  <source src={p.video} type="video/mp4" />
                </video>
              ) : (
                <img data-src={p.thumb} alt={`${p.title} thumbnail`} />
              )}

              <div className="info">
                <h3>{p.title}</h3>
                <p className="small">
                  {p.role} • {p.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <h3 id="contact-heading" style={{ marginBottom: 12 }}>
          Contact
        </h3>

        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 220 }}>
            <p className="small">Email</p>
            <a
              href="mailto:hello@alexrivera.design"
              style={{ color: "var(--accent)", fontWeight: 700 }}
            >
              hello@alexrivera.design
            </a>
          </div>

          <div style={{ minWidth: 220 }}>
            <p className="small">Availability</p>
            <div className="badge">Open for projects</div>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <a
              className="cta-btn"
              href="/assets/resume.pdf"
              aria-label="Download resume"
            >
              Download resume
            </a>
          </div>
        </div>
      </section>

      <footer className="footer" role="contentinfo">
        <div className="small">© {new Date().getFullYear()} Alex Rivera</div>
        <div style={{ display: "flex", gap: 12 }}>
          <a
            className="small"
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="small"
            href="https://www.behance.net"
            target="_blank"
            rel="noreferrer"
          >
            Behance
          </a>
          <a
            className="small"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>

      {/* Modal viewer */}
      {isModalOpen && activeProject && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} details`}
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("modal-backdrop"))
              closeModal();
          }}
        >
          <div className="modal" role="document">
            <div className="top" style={{ alignItems: "flex-start" }}>
              <div className="media" style={{ minHeight: 320 }}>
                {activeProject.type === "video" && activeProject.video && (
                  <video
                    controls
                    autoPlay
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  >
                    <source src={activeProject.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {activeProject.type === "image" && activeProject.images && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: 8,
                    }}
                  >
                    {activeProject.images.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`${activeProject.title} ${idx + 1}`}
                        style={{ width: "100%", display: "block" }}
                      />
                    ))}
                  </div>
                )}

                {activeProject.type === "3d" && (
                  <div
                    style={{
                      width: "100%",
                      height: 420,
                      background: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#9aa4b2",
                        textAlign: "center",
                        padding: 20,
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 8 }}>
                        {activeProject.title}
                      </div>
                      <div className="small">
                        Interactive 3D viewer placeholder
                      </div>
                      <div className="small" style={{ marginTop: 8 }}>
                        Replace this with a model viewer or Three.js canvas to
                        load {activeProject.model}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <aside className="meta">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0 }}>{activeProject.title}</h3>
                    <div className="small" style={{ marginTop: 6 }}>
                      {activeProject.role} • {activeProject.year}
                    </div>
                  </div>

                  <div>
                    <button
                      className="close-btn"
                      onClick={closeModal}
                      aria-label="Close project details"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <p style={{ marginTop: 12, color: "var(--muted)" }}>
                  {activeProject.description}
                </p>

                <div className="kv" style={{ marginTop: 14 }}>
                  <div className="small">Deliverables</div>
                  <div className="small" style={{ marginLeft: "auto" }}>
                    {activeProject.type}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                  <button
                    className="cta-btn"
                    onClick={() => {
                      navigate("prev");
                    }}
                    aria-label="Previous project"
                  >
                    Prev
                  </button>
                  <button
                    className="cta-ghost"
                    onClick={() => {
                      navigate("next");
                    }}
                    aria-label="Next project"
                  >
                    Next
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
