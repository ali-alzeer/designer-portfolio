import ErrorPage from "@/components/ErrorPage";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { is404 } = usePageContext();
  const { t } = useTranslation();
  if (is404) {
    return (
      <ErrorPage statusCode="404" errorMessage={t("error.pageNotFound")} />
    );
  } else {
    return <ErrorPage statusCode="500" errorMessage={t("error.serverError")} />;
  }
}
