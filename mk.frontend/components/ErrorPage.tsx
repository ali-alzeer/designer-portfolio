import { constColors, styles } from "@/styles/styles";
import { useTranslation } from "react-i18next";
import { navigate } from "vike/client/router";

const ErrorPage = ({
  statusCode = "404",
  errorMessage = "",
}: {
  statusCode: string;
  errorMessage: string;
}) => {
  const { t } = useTranslation();
  return (
    <div style={styles.errorPageContainer}>
      <h1 style={styles.errorPageCode}>{statusCode}</h1>
      <p>{errorMessage}</p>
      <button
        onClick={() => navigate("/")}
        style={{ ...styles.button, backgroundColor: constColors.accent }}
      >
        {t("error.backToMain")}
      </button>
    </div>
  );
};

export default ErrorPage;
