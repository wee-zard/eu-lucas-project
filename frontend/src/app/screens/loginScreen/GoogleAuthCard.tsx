import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { LocalStorageKeys, ScreenUrls } from "@model/enum";
import { redirectToUrl } from "@providers/RedirectionProvider";
import { validateEmailAddress } from "@api/command/userCommands";
import { getRefreshToken } from "@helper/authenticationUtils";
import { ReactComponent as GoogleLoginIcon } from "@media/google-login.svg";
import { openSnackbar, throwNotification, ToastSeverity } from "@helper/notificationUtil";
import { clearLocalStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import InfoIcon from "@mui/icons-material/Info";
import StyledButton from "@components/StyledButton";
import i18n from "@i18n/i18nHandler";
import StyledIconButton from "@components/StyledIconButton";
import { SnackEnum } from "@model/enum/SnackEnum";
import { useSelector } from "react-redux";
import { selectIsBackdropOpen } from "@redux/selectors/settingSelector";
import { useDispatch } from "react-redux";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";

const GoogleAuthCard = () => {
  const isBackdropOpen = useSelector(selectIsBackdropOpen);
  const dispatch = useDispatch();

  const handleEmailValidation = () => {
    validateEmailAddress()
      .then((isEmailValid) => {
        if (isEmailValid) {
          redirectToUrl(ScreenUrls.LucasScreenPath);
        }
      })
      .finally(() => dispatch(setSettingBackdropOpen(false)));
  };

  const handleRefreshTokenFetch = (
    success: Omit<CodeResponse, "error" | "error_description" | "error_uri">,
  ): void => {
    dispatch(setSettingBackdropOpen(true));
    getRefreshToken(success.code)
      .then((res) => {
        clearLocalStorage();
        setLocalStorageItem(res.id_token, LocalStorageKeys.GoogleOAuthToken);
        setLocalStorageItem(res.refresh_token, LocalStorageKeys.GoogleRefreshToken);
        handleEmailValidation();
      })
      .catch((err) => {
        throwNotification(ToastSeverity.Error, err.message);
        dispatch(setSettingBackdropOpen(false));
      });
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: handleRefreshTokenFetch,
    onError: () => {
      openSnackbar(SnackEnum.ERROR_ON_LOGIN);
      dispatch(setSettingBackdropOpen(false));
    },
  });

  return (
    <>
      <div className="flex-container">
        <StyledButton
          buttonText={i18n.t("screens.login.form.login-with-google")}
          buttonVariant={"outlined"}
          buttonIcon={<GoogleLoginIcon width={20} />}
          onClick={googleLogin}
          isDisabled={isBackdropOpen}
        />
        <StyledIconButton
          buttonIcon={<InfoIcon />}
          tooltip={{
            tooltipTitle: i18n.t("screens.login.info-button"),
            tooltipPlacement: "top",
          }}
          onClick={() => null}
        />
      </div>
    </>
  );
};

export default GoogleAuthCard;
