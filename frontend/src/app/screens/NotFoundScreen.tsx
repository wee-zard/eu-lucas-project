import i18n from "@i18n/i18nHandler";

const NotFoundScreen = () => {
  /*
  useEffect(() => {
    redirectToUrl(ScreenUrls.LoginScreenPath);
  }, []);
  */

  /** TODO: Impement a default 404 Not Found page. */
  return <div>{i18n.t("screens.not-found-page-not-found")}</div>;
};

export default NotFoundScreen;
