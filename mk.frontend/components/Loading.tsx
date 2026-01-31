import { useTheme } from "@/contexts/ThemeContext";

const Loading = () => {
  const { theme } = useTheme();

  return (
    <div
      className={theme}
      style={{
        ...styles.loading,
        backgroundColor: theme === "dark" ? "#000" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      Loading
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
  },
};

export default Loading;
