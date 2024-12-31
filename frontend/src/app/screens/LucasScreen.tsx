import React from "react";
import { extendTheme } from "@mui/material/styles";
import { AppProvider, Branding, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useToolpadRouterHook } from "@hooks/useToolpadRouterHook";
import { NavigationTitles } from "@navigation/ToolpadNavigations";
import TmpScreen from "@screens/TmpScreen";
import FilteringScreen from "@screens/filteringScreen/FilteringScreen";

type Props = {
  navigation?: Navigation;
  renderComponent?: JSX.Element;
};

const LucasScreen = ({navigation = [], renderComponent}: Props) => {

  const isNavigationBarHidden = navigation.length === 0;
  const router = useToolpadRouterHook(`/${NavigationTitles.Dashboard}`);
  const appTitle: Branding = {
    title: 'Lucas Image Analyzer',
    //logo: undefined, /** TODO: Put my application logo here! */
  };

  const renderComponentByRouterPath = () => {
    const pathList = router.pathname.split("/");
    let pathName = pathList[0];
    if (pathList.length > 1) {
      pathName = pathList[pathList.length - 1];
    }
    switch(pathName) {
      case NavigationTitles.Filtering:
        return <FilteringScreen />;
      case NavigationTitles.Default:
      case NavigationTitles.Dashboard:
        return <TmpScreen></TmpScreen>;
      default:
        return <TmpScreen></TmpScreen>;
    }
  }

  return (
    <AppProvider
      navigation={navigation}
      router={router}
      theme={appTheme}
      branding={appTitle}
    >
      <DashboardLayout hideNavigation={isNavigationBarHidden}>
        <PageContainer>
          {isNavigationBarHidden ? 
              <React.Fragment>
                {renderComponent}
              </React.Fragment>
            : 
              <React.Fragment>
                {renderComponentByRouterPath()}
              </React.Fragment>}
        </PageContainer>
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
