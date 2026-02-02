import { useTheme } from "@/contexts/ThemeContext";
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
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const pages = [];

    // Determine the window of 3 pages
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    // Adjust if we are at the very end to still show 3 pages
    if (endPage - startPage < 2 && totalPages >= 3) {
      startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = currentPage === i;

      pages.push(
        <button
          key={i}
          onClick={() => !isLoading && onPageChange(i)}
          style={{
            ...styles.button,
            ...(theme === "dark"
              ? { backgroundColor: "#fff", color: "#333" }
              : { backgroundColor: "#333", color: "#fff" }),
            ...(isActive ? styles.activeButton : {}),
            // Add a little margin between buttons
            margin: "0 4px",
          }}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div style={styles.container}>
      {/* Jump to First Page */}
      {currentPage > 2 && (
        <button
          onClick={() => onPageChange(1)}
          style={{
            ...styles.button,
            ...(theme === "dark"
              ? { backgroundColor: "#fff", color: "#333" }
              : { backgroundColor: "#333", color: "#fff" }),
          }}
        >
          «
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        style={{
          ...styles.button,
          ...(theme === "dark"
            ? { backgroundColor: "#fff", color: "#333" }
            : { backgroundColor: "#333", color: "#fff" }),
          ...(currentPage === 1
            ? {
                ...styles.disabledButton,
                ...(theme === "dark"
                  ? { backgroundColor: "#f5f5f5", color: "#999" }
                  : { backgroundColor: "#999", color: "#f5f5f5" }),
              }
            : {}),
        }}
      >
        ‹
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        style={{
          ...styles.button,
          ...(theme === "dark"
            ? { backgroundColor: "#fff", color: "#333" }
            : { backgroundColor: "#333", color: "#fff" }),
          ...(currentPage === totalPages
            ? {
                ...styles.disabledButton,
                ...(theme === "dark"
                  ? { backgroundColor: "#f5f5f5", color: "#999" }
                  : { backgroundColor: "#999", color: "#f5f5f5" }),
              }
            : {}),
        }}
      >
        ›
      </button>

      {/* Jump to Last Page */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          style={{
            ...styles.button,
            ...(theme === "dark"
              ? { backgroundColor: "#fff", color: "#333" }
              : { backgroundColor: "#333", color: "#fff" }),
          }}
        >
          »
        </button>
      )}
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "40px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    color: "#333",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  navigationButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    color: "#333",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  activeButton: {
    backgroundColor: "#bd00df",
    color: "#ffffff",
    boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
  },
  disabledButton: {
    backgroundColor: "#f5f5f5",
    color: "#999",
    cursor: "not-allowed",
    boxShadow: "none",
  },
};
export default PaginationControls;
