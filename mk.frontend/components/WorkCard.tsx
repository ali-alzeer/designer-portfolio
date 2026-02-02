import { convertToEmbedUrl } from "@/lib/utils";
import { styles } from "@/styles/styles";
import { Work } from "@/types";
import React from "react";
import { navigate } from "vike/client/router";

const WorkCard = ({ work }: { work: Work }) => {
  const [isAssetLoading, setIsAssetLoading] = React.useState(true);

  return (
    <div
      onClick={() => {
        navigate(`/work/${work.id}`);
      }}
      className="card"
      style={{ position: "relative" }}
    >
      {/* Skeleton Overlay: Only visible while asset is downloading */}
      {isAssetLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 2,
          }}
        >
          <div style={styles.skeletonStyleContainer} />
          <div style={styles.skeletonStyleTitle} />
        </div>
      )}

      <div style={{ visibility: isAssetLoading ? "hidden" : "visible" }}>
        {work.type === "video" ? (
          <div style={styles.cardImage}>
            <iframe
              style={{ width: "100%", height: "100%", border: "none" }}
              src={convertToEmbedUrl(work.publicWorkMediaUrl) ?? ""}
              onLoad={() => setIsAssetLoading(false)}
            />
          </div>
        ) : (
          <div
            style={{
              ...styles.cardImage,
              backgroundImage: `url(${work.publicWorkMediaUrl})`,
            }}
          >
            {/* Hidden img tag just to trigger the onLoad event */}
            <img
              src={work.publicWorkMediaUrl}
              style={{ display: "none" }}
              onLoad={() => setIsAssetLoading(false)}
            />
            <div
              className="card-overlay"
              style={{
                background: `linear-gradient(to top, rgba(255,255,255,0.2), transparent)`,
              }}
            ></div>
          </div>
        )}
        <h3 style={styles.cardTitle}>{work.title}</h3>
      </div>
    </div>
  );
};

export default WorkCard;
