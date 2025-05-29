import { extendTheme } from "@mui/material/styles";
import {
  AppProvider,
  Authentication,
  Branding,
  Navigation,
  Session,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useToolpadRouterHook } from "@hooks/useToolpadRouterHook";
import { NavigationSegments } from "@navigation/ToolpadNavigations";
import TmpScreen from "@screens/TmpScreen";
import FilteringScreen from "@screens/filteringScreen/FilteringScreen";
import UploadProcedureScreen from "@screens/uploadProcedureScreen/UploadProcedureScreen";
import ReportScreen from "@screens/ReportScreen";
import i18n from "@i18n/i18nHandler";
import { useMemo } from "react";
import LucasSidebarFooterAccount from "./LucasSidebarFooterAccount";
import { LocalStorageKeys, ScreenUrls } from "@model/enum";
import { redirectToUrl } from "@providers/RedirectionProvider";
import { googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import AuthorizedUserModel from "@model/AuthorizedUserModel";

type Props = {
  navigation?: Navigation;
  renderComponent?: JSX.Element;
};

const LucasScreen = ({ navigation = [], renderComponent }: Props) => {
  const isNavigationBarHidden = navigation.length === 0;
  const router = useToolpadRouterHook(NavigationSegments.Dashboard);
  const appTitle: Branding = {
    title: i18n.t("screens.dashboard.header.title"),
    //TODO: The application logo will go here.
    //logo: <img src="https://avatars.githubusercontent.com/u/19550456" />,
  };

  const authentication: Authentication = useMemo(() => {
    return {
      signIn: () => null,
      signOut: () => {
        const localStorageKeys = Object.keys(localStorage);
        console.log(localStorageKeys);

        localStorageKeys.forEach((key) => {
          if (key === LocalStorageKeys.ToolPadMode || key === LocalStorageKeys.SetItem) {
            return;
          }

          localStorage.removeItem(key);
        });

        googleLogout();
        redirectToUrl(ScreenUrls.LoginScreenPath);
      },
    };
  }, []);

  const renderComponentByRouterPath = () => {
    const pathList = router.pathname.split("/");
    let pathName = pathList[0];

    if (pathList.length > 1) {
      pathName = pathList[pathList.length - 1];
    }

    switch (pathName) {
      case NavigationSegments.Filtering:
        return <FilteringScreen />;
      case NavigationSegments.UploadProcedureResults:
        return <UploadProcedureScreen />;
      case NavigationSegments.ReportError:
        return <ReportScreen></ReportScreen>;
      default:
        return <TmpScreen></TmpScreen>;
    }
  };

  const renderPageContainerContent = () => {
    return <>{isNavigationBarHidden ? renderComponent : renderComponentByRouterPath()}</>;
  };

  /**
   * Reads the auth token from the local storage, decodes it with {@link jwtDecode}, creates
   * an {@link AuthorizedUserModel}, and constructs the session for the application.
   *
   * @returns Returns the session information from the auth token.
   */
  const getUserSession = (): Session | undefined => {
    const authToken = localStorage.getItem(LocalStorageKeys.GoogleOAuthToken);

    if (!authToken) {
      return;
    }

    const decodedToken: AuthorizedUserModel = jwtDecode(authToken);

    if (!decodedToken || !decodedToken.email || !decodedToken.given_name) {
      return;
    }

    return {
      user: {
        name: decodedToken.name,
        email: decodedToken.email,
        image: decodedToken.picture,
      },
    };
  };

  return (
    <AppProvider
      authentication={authentication}
      session={getUserSession()}
      navigation={navigation}
      router={router}
      theme={appTheme}
      branding={appTitle}
    >
      <DashboardLayout
        hideNavigation={isNavigationBarHidden}
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: LucasSidebarFooterAccount,
        }}
      >
        <PageContainer>{renderPageContainerContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default LucasScreen;

const appTheme = extendTheme({
  colorSchemes: { dark: true, light: true },
  colorSchemeSelector: "class",
  defaultColorScheme: "light",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
