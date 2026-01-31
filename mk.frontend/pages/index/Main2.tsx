import React, { useState, useEffect, useMemo } from "react";

// --- Types ---
type Category = "All" | "Graphic" | "Video" | "3D";

interface Project {
  id: number;
  title: string;
  category: Category;
  color: string;
  description: string;
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Neon Brand Kit",
    category: "Graphic",
    color: "#ff0055",
    description: "Identity for a futuristic synth-wave label.",
  },
  {
    id: 2,
    title: "Kinetic Motion",
    category: "Video",
    description: "High-paced commercial edit for athletic gear.",
    color: "#00f2ff",
  },
  {
    id: 3,
    title: "Isometric Rooms",
    category: "3D",
    description: "Low-poly architectural interior visualization.",
    color: "#7000ff",
  },
  {
    id: 4,
    title: "Minimal Logofolio",
    category: "Graphic",
    description: "Collection of vector-based minimalist marks.",
    color: "#ffaa00",
  },
  {
    id: 5,
    title: "Music Video FX",
    category: "Video",
    description: "VFX heavy sequence using 3D tracking.",
    color: "#00ff88",
  },
  {
    id: 6,
    title: "Procedural Textures",
    category: "3D",
    description: "Abstract shaders created for game engines.",
    color: "#555555",
  },
];

const Portfolio = () => {
  const [filter, setFilter] = useState<Category>("All");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

      {/* --- Navigation --- */}
      <nav style={styles.nav}>
        <div style={styles.logo}>STUDIO_DESIGN</div>
        <div style={styles.navLinks}>
          <span>WORK</span>
          <span>ABOUT</span>
          <span style={styles.contactBtn}>HIRE ME</span>
        </div>
      </nav>

      {/* --- Hero Section (The "3D" Hook) --- */}
      <section style={styles.hero}>
        <div className="scene">
          <div className="cube">
            <div className="face front">GRAPHIC</div>
            <div className="face back">MOTION</div>
            <div className="face right">VIDEO</div>
            <div className="face left">3D</div>
            <div className="face top">DESIGN</div>
            <div className="face bottom">CREATIVITY</div>
          </div>
        </div>

        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            MOHAMMAD <br /> ALKHALED
          </h1>
          <p style={styles.subtitle}>
            Merging Graphic Design, Motion, and 3D space.
          </p>
        </div>
      </section>

      {/* --- Portfolio Section --- */}
      <section style={styles.workSection}>
        <div style={styles.filterBar}>
          {(["All", "Graphic", "Video", "3D"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                ...styles.filterTab,
                color: filter === cat ? "#fff" : "#666",
                borderBottom:
                  filter === cat ? "2px solid #fff" : "2px solid transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card" style={styles.card}>
              <div
                style={{ ...styles.cardImage, backgroundColor: project.color }}
              >
                <div style={styles.cardOverlay}>
                  <p style={styles.categoryLabel}>{project.category}</p>
                </div>
              </div>
              <div style={styles.cardInfo}>
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <p style={styles.cardDesc}>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer style={styles.footer}>
        <p>© 2026 CREATIVE_ENGINE. Built with Raw React & CSS.</p>
      </footer>
    </div>
  );
};

// --- CSS-in-JS Objects ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#050505",
    color: "#fff",
    minHeight: "100vh",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2rem 4%",
    position: "fixed",
    width: "100%",
    zIndex: 100,
    backdropFilter: "blur(10px)",
  },
  logo: { fontWeight: 900, letterSpacing: "-1px", fontSize: "1.2rem" },
  navLinks: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  contactBtn: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "0.5rem 1rem",
    borderRadius: "2px",
  },

  hero: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1000px",
    overflow: "hidden",
  },
  heroContent: { textAlign: "center", marginTop: "4rem", zIndex: 10 },
  title: {
    fontSize: "clamp(3rem, 10vw, 8rem)",
    fontWeight: 900,
    lineHeight: 0.9,
    textTransform: "uppercase",
    margin: 0,
  },
  subtitle: {
    color: "#888",
    marginTop: "1rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontSize: "0.9rem",
  },

  workSection: { padding: "0 4% 5rem 4%" },
  filterBar: {
    display: "flex",
    gap: "2rem",
    marginBottom: "3rem",
    borderBottom: "1px solid #222",
  },
  filterTab: {
    background: "none",
    border: "none",
    padding: "1rem 0",
    cursor: "pointer",
    fontWeight: 700,
    transition: "0.3s",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "2rem",
  },
  card: { cursor: "pointer", transition: "transform 0.3s ease" },
  cardImage: {
    height: "300px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "4px",
  },
  cardOverlay: { position: "absolute", bottom: "1rem", left: "1rem" },
  categoryLabel: {
    fontSize: "0.7rem",
    fontWeight: 900,
    background: "#000",
    padding: "4px 8px",
    borderRadius: "2px",
  },
  cardInfo: { marginTop: "1.5rem" },
  cardTitle: { fontSize: "1.2rem", margin: "0 0 0.5rem 0" },
  cardDesc: { color: "#666", fontSize: "0.9rem", lineHeight: 1.5 },

  footer: {
    padding: "5rem 4%",
    borderTop: "1px solid #222",
    textAlign: "center",
    color: "#444",
    fontSize: "0.8rem",
  },
};

// --- Raw CSS for Animations and 3D ---
const globalCSS = `
  @keyframes rotateCube {
    from { transform: rotateX(0deg) rotateY(0deg); }
    to { transform: rotateX(360deg) rotateY(360deg); }
  }

  .scene {
    width: 200px;
    height: 200px;
    perspective: 600px;
  }

  .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: rotateCube 20s infinite linear;
  }

  .face {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 1.5rem;
    backdrop-filter: blur(10px);
    text-align: center;
  }

  .front  { background-color: #343434; transform: rotateY(0deg) translateZ(100px);}
  .back   { background-color: #34ff34; transform: rotateY(180deg) translateZ(100px); }
  .right  { background-color: #ff3434; transform: rotateY(90deg) translateZ(100px); }
  .left   { background-color: #3434ff; transform: rotateY(-90deg) translateZ(100px); }
  .top    { background-color: #eaaa34; transform: rotateX(90deg) translateZ(100px); }
  .bottom { background-color: #34edaa; transform: rotateX(-90deg) translateZ(100px); }

  .project-card:hover {
    transform: translateY(-10px);
  }
  
  .project-card:hover .cardImage {
    filter: brightness(1.2);
  }

  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
`;

export default Portfolio;
