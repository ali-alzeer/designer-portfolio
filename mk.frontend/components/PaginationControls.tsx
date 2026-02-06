import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/lib/utils";
import { constColors } from "@/styles/styles";
import React from "react";

interface Props {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const PaginationControls: React.FC<Props> = ({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  isLoading,
}) => {
  const { theme } = useTheme();
  const IsMobile = useIsMobile(320);
  const isDark = theme === "dark";
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Dynamic Theme Base
  const themeBase = isDark
    ? { backgroundColor: "#ffffff", color: "#111111" }
    : { backgroundColor: "#111111", color: "#ffffff" };

  const themeDisabled = isDark
    ? {
        backgroundColor: "#333333",
        color: "#666666",
        cursor: "not-allowed",
        boxShadow: "none",
      }
    : {
        backgroundColor: "#e0e0e0",
        color: "#999999",
        cursor: "not-allowed",
        boxShadow: "none",
      };

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    if (endPage - startPage < 2 && totalPages >= 3) {
      startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = currentPage === i;
      pages.push(
        <button
          key={i}
          disabled={isLoading}
          onClick={() => onPageChange(i)}
          style={{
            ...styles.localButton,
            ...themeBase,
            ...(isActive ? styles.activeButton : {}),
            opacity: isLoading ? 0.7 : 1,
            margin: "0 4px",
          }}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        ...styles.localContainer,
        flexDirection: IsMobile ? "column" : "row",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        {/* Jump to First Page */}
        {currentPage > 2 && (
          <button
            disabled={isLoading || currentPage === 1}
            onClick={() => onPageChange(1)}
            style={{
              ...styles.localButton,
              ...themeBase,
              ...(isLoading || currentPage === 1 ? themeDisabled : {}),
            }}
          >
            «
          </button>
        )}

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          style={{
            ...styles.localButton,
            ...themeBase,
            ...(currentPage === 1 || isLoading ? themeDisabled : {}),
          }}
        >
          ‹
        </button>
      </div>

      <div style={{ display: "flex" }}>{renderPageNumbers()}</div>

      <div style={{ display: "flex", gap: "10px" }}>
        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          style={{
            ...styles.localButton,
            ...themeBase,
            ...(currentPage === totalPages || isLoading ? themeDisabled : {}),
          }}
        >
          ›
        </button>

        {/* Jump to Last Page */}
        {currentPage < totalPages - 1 && (
          <button
            disabled={isLoading || currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            style={{
              ...styles.localButton,
              ...themeBase,
              ...(isLoading || currentPage === totalPages ? themeDisabled : {}),
            }}
          >
            »
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  localContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "40px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  localButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "40px",
  },
  activeButton: {
    backgroundColor: constColors.accent,
    color: "#ffffff",
    borderColor: "#6366f1",
    boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
    transform: "scale(1.1)",
  },
};

export default PaginationControls;
