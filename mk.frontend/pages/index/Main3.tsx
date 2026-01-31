import React, { useState, useMemo } from "react";

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
  const [filter, setFilter] = useState<Category>("All");

  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <div style={styles.container}>
      <style>{globalCSS}</style>

      {/* --- Nav --- */}
      <nav style={styles.nav}>
        <div style={styles.logo}>MK</div>
        <div style={styles.navLinks}>
          <a href="#work" style={styles.navLink}>
            Work
          </a>
          <a href="#about" style={styles.navLink}>
            About
          </a>
          <button style={styles.contactBtn}>Contact</button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section style={styles.hero}>
        <div style={styles.visualStack}>
          {/* 3D CUBE ANIMATION */}
          <div className="scene">
            <div className="cube">
              <div className="face front">3D</div>
              <div className="face back">3D</div>
              <div className="face right">3D</div>
              <div className="face left">3D</div>
              <div className="face top"></div>
              <div className="face bottom"></div>
            </div>
          </div>

          {/* VIDEO EDITING ANIMATION (FILM STRIP) */}
          <div className="video-strip-container">
            <div className="film-strip">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="frame" />
              ))}
            </div>
            <div className="playhead" />
          </div>

          {/* MOTION GRAPHICS ANIMATION (ORBIT) */}
          <div className="motion-orbit">
            <div className="ring" />
            <div className="ring delay-1" />
            <div className="dot" />
          </div>
        </div>

        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>
            MOHAMMAD
            <br />
            <span className="gradient-text">ALKHALED</span>
          </h1>
          <p style={styles.heroSub}>3D ARTIST // VIDEO EDITOR // DESIGNER</p>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <div style={styles.imageContainer}>
            <img
              loading="eager"
              src="https://res.cloudinary.com/dwrnygn0d/image/upload/v1731421077/mainimagemk-min_mrhpp8.png"
              alt="Designer Mohammad Alkhaled Photo"
              style={styles.profileImg}
            />
            <div className="img-glow" />
          </div>
          <div style={styles.aboutText}>
            <h2 style={styles.sectionTitle}>About Me</h2>
            <p style={styles.p}>
              I blend technical precision with creative flair. Whether it&apos;s
              crafting 3D environments, stitching high-energy video sequences,
              or designing brand identities, I build experiences that resonate.
              10 years of pushing pixels across dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* --- Work Section --- */}
      <section id="work" style={styles.workSection}>
        <div style={styles.filterHeader}>
          <h2 style={styles.sectionTitle}>Selected Projects</h2>
          <div style={styles.filterGroup}>
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
          </div>
        </div>

        <div style={styles.grid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="card">
              <div
                style={{
                  ...styles.cardImage,
                  backgroundImage: `url(${project.image})`,
                }}
              >
                <div
                  className="card-overlay"
                  style={{
                    background: `linear-gradient(to top, ${project.color}aa, transparent)`,
                  }}
                >
                  <span style={styles.tag}>{project.category}</span>
                </div>
              </div>
              <h3 style={styles.cardTitle}>{project.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 DESIGNER PORTFOLIO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
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
    backdropFilter: "blur(15px)",
  },
  logo: { fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-1px" },
  navLinks: { display: "flex", gap: "2rem", alignItems: "center" },
  navLink: {
    color: "#888",
    textDecoration: "none",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  contactBtn: {
    background: "#fff",
    color: "#000",
    border: "none",
    padding: "0.6rem 1.2rem",
    fontWeight: 700,
    borderRadius: "2px",
    cursor: "pointer",
  },

  hero: {
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    textAlign: "center",
  },
  visualStack: {
    display: "flex",
    gap: "4rem",
    marginBottom: "4rem",
    flexWrap: "wrap",
    justifyContent: "center",
    scale: "0.8",
  },
  heroText: { padding: "0 2rem" },
  heroTitle: {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: 900,
    lineHeight: 1,
    margin: 0,
    letterSpacing: "-2px",
  },
  heroSub: {
    color: "#666",
    marginTop: "1.5rem",
    letterSpacing: "4px",
    fontSize: "0.8rem",
    fontWeight: 700,
  },

  aboutSection: { padding: "10rem 10%", backgroundColor: "#050505" },
  aboutContent: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "5rem",
    alignItems: "center",
  },
  imageContainer: { position: "relative" },
  profileImg: {
    width: "100%",
    height: "450px",
    objectFit: "cover",
    borderRadius: "1rem",
    position: "relative",
    zIndex: 2,
  },
  aboutText: { textAlign: "left" },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: "2rem",
    textTransform: "uppercase",
  },
  p: { color: "#aaa", lineHeight: 1.8, fontSize: "1.1rem", maxWidth: "500px" },

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
  footer: {
    padding: "5rem",
    borderTop: "1px solid #111",
    textAlign: "center",
    color: "#333",
    fontSize: "0.7rem",
    letterSpacing: "2px",
  },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

  /* 3D Cube */
  .scene { width: 150px; height: 150px; perspective: 600px; }
  .cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; animation: rotateCube 15s infinite linear; }
  .face { position: absolute; width: 150px; height: 150px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; font-weight: 900; background: rgba(255,255,255,0.02); backdrop-filter: blur(4px); }
  .front { transform: translateZ(75px); } .back { transform: rotateY(180deg) translateZ(75px); }
  .right { transform: rotateY(90deg) translateZ(75px); } .left { transform: rotateY(-90deg) translateZ(75px); }
  .top { transform: rotateX(90deg) translateZ(75px); } .bottom { transform: rotateX(-90deg) translateZ(75px); }

  @keyframes rotateCube { from { transform: rotateX(0deg) rotateY(0deg); } to { transform: rotateX(360deg) rotateY(360deg); } }

  /* Video Strip */
  .video-strip-container { width: 150px; height: 150px; border: 2px solid #333; position: relative; overflow: hidden; display: flex; align-items: center; background: #111; }
  .film-strip { display: flex; gap: 10px; animation: slideStrip 4s infinite linear; }
  .frame { min-width: 100px; height: 80px; background: #222; border: 4px solid #000; position: relative; }
  .frame::before, .frame::after { content: ''; position: absolute; left: 0; width: 100%; height: 6px; background: repeating-linear-gradient(90deg, #333 0 5px, transparent 5px 10px); }
  .frame::before { top: -12px; } .frame::after { bottom: -12px; }
  .playhead { position: absolute; left: 50%; width: 2px; height: 100%; background: #ff0055; box-shadow: 0 0 10px #ff0055; z-index: 5; }

  @keyframes slideStrip { from { transform: translateX(0); } to { transform: translateX(-110px); } }

  /* Motion Orbit */
  .motion-orbit { width: 150px; height: 150px; position: relative; display: flex; align-items: center; justify-content: center; }
  .ring { position: absolute; border: 2px solid #444; border-radius: 50%; width: 100%; height: 100%; animation: pulse 3s infinite ease-out; }
  .delay-1 { animation-delay: 1.5s; }
  .dot { width: 20px; height: 20px; background: #fff; border-radius: 50%; animation: bounce 2s infinite ease-in-out; }

  @keyframes pulse { 0% { transform: scale(0.2); opacity: 1; } 100% { transform: scale(1.2); opacity: 0; } }
  @keyframes bounce { 0%, 100% { transform: translateY(-20px) scale(0.8); } 50% { transform: translateY(20px) scale(1.2); } }

  /* Utilities */
  .gradient-text { background: linear-gradient(90deg, #6366f1, #ec4899, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .card { cursor: pointer; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .card:hover { transform: translateY(-10px) scale(1.02); }
  .card-overlay { position: absolute; inset: 0; opacity: 0; transition: 0.3s; }
  .card:hover .card-overlay { opacity: 1; }
  .img-glow { position: absolute; inset: -20px; background: linear-gradient(45deg, #6366f1, #ec4899); filter: blur(40px); opacity: 0.2; z-index: 1; }
  
  html { scroll-behavior: smooth; }
  body { margin: 0; padding: 0; }
`;

export default Portfolio;
