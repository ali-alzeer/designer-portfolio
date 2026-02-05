import { constColors, styles } from "@/styles/styles";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export default function Page() {
  const { is404 } = usePageContext();
  const { t } = useTranslation();
  if (is404) {
    return (
      <div style={styles.errorPageContainer}>
        <h1 style={styles.errorPageCode}>404</h1>
        <p>{t("error.pageNotFound")}</p>
        <button
          onClick={() => navigate("/")}
          style={{ ...styles.button, backgroundColor: constColors.accent }}
        >
          {t("error.backToMain")}
        </button>
      </div>
    );
  }
  return (
    <div style={styles.errorPageContainer}>
      <h1 style={styles.errorPageCode}>500</h1>
      <p>{t("error.serverError")}</p>
      <button
        onClick={() => navigate("/")}
        style={{ ...styles.button, backgroundColor: constColors.accent }}
      >
        {t("error.backToMain")}
      </button>
    </div>
  );
}
