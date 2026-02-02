import React, { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const Loading = ({ onFinished }: { onFinished: () => void }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number;
    const duration = 1000; // Force a 1.5s beautiful intro

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const val = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(val));

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        // Wait a tiny beat at 100% for impact, then tell the layout we're done
        setTimeout(onFinished, 200);
      }
    };

    requestAnimationFrame(animate);
  }, [onFinished]);

  const isDark = theme === "dark";

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isDark ? "#000" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <div style={styles.content}>
        <div className="fade-in-out" style={styles.brand}>
          {`${t("hero.title")} ${t("hero.span")}`}
        </div>

        <div
          style={{ ...styles.track, backgroundColor: isDark ? "#222" : "#eee" }}
        >
          <div
            style={{
              ...styles.bar,
              width: `${progress}%`,
              backgroundColor: isDark ? "#fff" : "#000",
            }}
          />
        </div>

        <div style={styles.status}>
          <span>
            {progress === 100 ? t("loading.ready") : t("loading.loading")}
          </span>
          <span>{progress}%</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
        .fade-in-out {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    transition: "all 0.4s ease-in-out",
    textAlign: "center",
  },
  content: { width: "280px" },
  brand: {
    fontSize: "11px",
    marginBottom: "12px",
    fontWeight: "bold",
  },
  subtitle: { fontWeight: "normal", opacity: 0.5 },
  track: {
    width: "100%",
    height: "1px",
    position: "relative",
    marginBottom: "8px",
  },
  bar: { height: "100%", transition: "width 0.1s linear" },
  status: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "9px",
    fontFamily: "monospace",
    opacity: 0.6,
  },
};

export default Loading;
