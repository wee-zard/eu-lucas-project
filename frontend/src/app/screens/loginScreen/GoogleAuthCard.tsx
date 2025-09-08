import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { LocalStorageKeys, ScreenUrls } from "@model/enum";
import { redirectToUrl } from "@providers/RedirectionProvider";
import { activateUserCommand } from "@api/command/userCommands";
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
import { selectIsBackdropOpen } from "@redux/selectors/backgroundSelector";
import { useDispatch } from "react-redux";
import { setBackgroundBackdropOpen } from "@redux/actions/backgroundActions";
import AuthorizationModel from "@model/AuthorizationModel";
import { jwtDecode } from "jwt-decode";
import AuthorizedUserModel from "@model/AuthorizedUserModel";
import UserStatusChangeRequest from "@model/request/UserStatusChangeRequest";
import { UserStatusEnum } from "@model/enum/UserStatusEnum";
import { setAuthenticatedUser } from "@redux/actions/userActions";
import { validateEmailAddress } from "@api/command/authenticationCommands";

const GoogleAuthCard = () => {
  const isBackdropOpen = useSelector(selectIsBackdropOpen);
  const dispatch = useDispatch();

  const throwErrorFromCommand = (err: any) => {
    console.error(err);
    throwNotification(ToastSeverity.Error, err.message);
    dispatch(setBackgroundBackdropOpen(false));
  };

  const activateUser = async (token: AuthorizationModel) => {
    const decodedToken: AuthorizedUserModel = jwtDecode(token.id_token);

    if (!decodedToken || !decodedToken.email || !decodedToken.name) {
      // TODO: Error message here.
      dispatch(setBackgroundBackdropOpen(false));
      return;
    }

    const req: UserStatusChangeRequest = {
      status: UserStatusEnum.ACTIVATED,
      username: decodedToken.name,
      imageUrl: decodedToken.picture ?? undefined,
    };

    activateUserCommand(req)
      .then(() => {
        setLocalStorageItem(token.id_token, LocalStorageKeys.GoogleOAuthToken);
        setLocalStorageItem(token.refresh_token, LocalStorageKeys.GoogleRefreshToken);
        redirectToUrl(ScreenUrls.LucasScreenPath);
      })
      .catch(throwErrorFromCommand)
      .finally(() => dispatch(setBackgroundBackdropOpen(false)));
  };

  const handleEmailValidation = (token: AuthorizationModel) => {
    validateEmailAddress()
      .then((authenticatedUser) => {
        if (!authenticatedUser) {
          dispatch(setBackgroundBackdropOpen(false));
          return;
        }

        dispatch(setAuthenticatedUser(authenticatedUser));
        activateUser(token);
      })
      .catch(throwErrorFromCommand);
  };

  const handleRefreshTokenFetch = (
    success: Omit<CodeResponse, "error" | "error_description" | "error_uri">,
  ): void => {
    dispatch(setBackgroundBackdropOpen(true));
    clearLocalStorage();
    getRefreshToken(success.code).then(handleEmailValidation).catch(throwErrorFromCommand);
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: handleRefreshTokenFetch,
    onError: () => {
      openSnackbar(SnackEnum.ERROR_ON_LOGIN);
      dispatch(setBackgroundBackdropOpen(false));
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
