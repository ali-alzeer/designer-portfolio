import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  color?: string;
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  color = "#888888",
  fullscreen = false,
}) => {
  const dimensions = {
    small: "24px",
    medium: "48px",
    large: "80px",
  };

  const loaderSize = dimensions[size];

  const containerStyle: React.CSSProperties = fullscreen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        zIndex: 9999,
      }
    : {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      };

  return (
    <div style={containerStyle}>
      <div
        className="designer-loader"
        style={{
          width: loaderSize,
          height: loaderSize,
          border: `1px solid ${color}22`, // Very faint background ring
          borderRadius: "50%",
          position: "relative",
        }}
      >
        <style>
          {`
            .designer-loader::after, .designer-loader::before {
              content: '';
              position: absolute;
              border-radius: 50%;
              border: 6px solid transparent;
              border-top-color: ${color};
            }

            .designer-loader::after {
              top: -1px; left: -1px; right: -1px; bottom: -1px;
              animation: portfolio-spin 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }

            .designer-loader::before {
              top: 5px; left: 5px; right: 5px; bottom: 5px;
              opacity: 0.5;
              animation: portfolio-spin 3s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse;
            }

            @keyframes portfolio-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
