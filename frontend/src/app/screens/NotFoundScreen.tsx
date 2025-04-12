import i18n from "@i18n/i18nHandler";

const NotFoundScreen = () => {
  /** TODO: Implement a default 404 Not Found page. */
  return <div>{i18n.t("screens.not-found.page-not-found")}</div>;
};

export default NotFoundScreen;
