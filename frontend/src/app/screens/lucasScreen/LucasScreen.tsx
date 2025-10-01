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
import ReportScreen from "@screens/reportScreen/ReportScreen";
import i18n from "@i18n/i18nHandler";
import { useEffect, useMemo, useState } from "react";
import LucasSidebarFooterAccount from "./LucasSidebarFooterAccount";
import { ScreenUrls } from "@model/enum";
import { clearLocalStorage } from "@helper/localStorageUtil";
import ManageUsersScreen from "@screens/manageUsersScreen/ManageUsersScreen";
import { googleLogout } from "@react-oauth/google";
import { redirectToUrl } from "@providers/RedirectionProvider";
import SessionUtil from "@helper/SessionUtil";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import ManageFoldersScreen from "@screens/manageFoldersScreen/ManageFoldersScreen";
import SettingsScreen from "@screens/settingsScreen/SettingsScreen";
import ManageLogsScreen from "@screens/manageLogsScreen/ManageLogsScreen";

type Props = {
  navigation?: Navigation;
  renderComponent?: JSX.Element;
};

const LucasScreen = ({ navigation = [], renderComponent }: Props) => {
  const [userSession, setUserSession] = useState<Session>(SessionUtil.defaultSessionObj);
  const isNavigationBarHidden = navigation.length === 0;
  const router = useToolpadRouterHook(NavigationSegments.Dashboard);
  const appTitle: Branding = {
    title: i18n.t("screens.dashboard.header.title"),
    //TODO: The application logo will go here.
  };

  useEffect(() => {
    SessionUtil.getSession().then(setUserSession);
  }, []);

  const authentication: Authentication = useMemo(() => {
    return {
      signIn: () => null,
      signOut: () => {
        clearLocalStorage();
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

    const handler: GenericHandlerType<NavigationSegments, JSX.Element> = {
      [NavigationSegments.Filtering]: <FilteringScreen />,
      [NavigationSegments.UploadProcedureResults]: <UploadProcedureScreen />,
      [NavigationSegments.UploadLogManagement]: <ManageLogsScreen />,
      [NavigationSegments.ReportError]: <ReportScreen />,
      [NavigationSegments.UserManagement]: <ManageUsersScreen />,
      [NavigationSegments.ImageFolders]: <ManageFoldersScreen />,
      [NavigationSegments.Dashboard]: <TmpScreen />,
      [NavigationSegments.Manual]: <TmpScreen />,
      [NavigationSegments.Settings]: <SettingsScreen />,
    };

    return handler[pathName as NavigationSegments];
  };

  const pageContainer = (
    <>{isNavigationBarHidden ? renderComponent : renderComponentByRouterPath()}</>
  );

  return (
    <AppProvider
      authentication={authentication}
      session={userSession}
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
        <PageContainer>{pageContainer}</PageContainer>
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
