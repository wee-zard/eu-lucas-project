import i18n from "@i18n/i18nHandler";
import { styled } from "@mui/material";
import { ReactComponent as NotFoundSvg } from "@media/404-not-found.svg";

const NotFoundScreen = () => {
  return (
    <StyledNoResultHolder className="grid-align-to-center">
      <div className="flex-align-to-center">
        <NotFoundSvg width={"100%"} />
      </div>
      <div className="grid-align-to-center">
        <p>{i18n.t("screens.not-found.page-not-found-top")}</p>
        <p>{i18n.t("screens.not-found.page-not-found-bottom")}</p>
      </div>
    </StyledNoResultHolder>
  );
};

export default NotFoundScreen;

const StyledNoResultHolder = styled("div")({
  height: "80vh",
});
