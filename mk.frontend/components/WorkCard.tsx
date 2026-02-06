import { useLanguage } from "@/contexts/LanguageContext";
import { convertToEmbedUrl } from "@/lib/utils";
import { styles } from "@/styles/styles";
import { Work } from "@/types";
import React from "react";
import { navigate } from "vike/client/router";
import DEFAULT_IMAGE_FOR_IMAGES from "../assets/default_image.webp";
import DEFAULT_IMAGE_FOR_VIDEOS from "../assets/default_video.webp";

const WorkCard = ({ work }: { work: Work }) => {
  const [isAssetLoading, setIsAssetLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const { language } = useLanguage();

  const displayUrl = hasError
    ? work.type === "video"
      ? DEFAULT_IMAGE_FOR_VIDEOS
      : DEFAULT_IMAGE_FOR_IMAGES
    : work.publicWorkMediaUrl;

  const handleMediaLoad = () => {
    setIsAssetLoading(false);
  };

  const handleMediaError = () => {
    setHasError(true);
    setIsAssetLoading(false);
  };

  return (
    <div
      onClick={() => {
        navigate(`/work/${work.id}`);
      }}
      className="card"
      style={{ position: "relative" }}
    >
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
        {work.type === "video" && !hasError ? (
          <div style={styles.cardImage}>
            <iframe
              style={{ width: "100%", height: "100%", border: "none" }}
              src={convertToEmbedUrl(displayUrl) ?? ""}
              onLoad={handleMediaLoad}
              onError={handleMediaError}
            />
          </div>
        ) : (
          <div
            style={{
              ...styles.cardImage,
              backgroundImage: `url(${displayUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={displayUrl}
              style={{ display: "none" }}
              onLoad={handleMediaLoad}
              onError={handleMediaError}
            />
            <div
              className="card-overlay"
              style={{
                background: `linear-gradient(to top, rgba(255,255,255,0.2), transparent)`,
              }}
            ></div>
          </div>
        )}
        <h3 style={styles.cardTitle}>
          {language === "en" ? work.titleEn : work.titleAr}
        </h3>
      </div>
    </div>
  );
};

export default WorkCard;
