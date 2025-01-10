import { GuardTypes, ScreenUrls } from "@model/enum";
import RouterModel from "@model/RouterModel";
import DefaultScreen from "@screens/DefaultScreen";
import LoginScreen from "@screens/LoginScreen";
import NotFoundScreen from "@screens/NotFoundScreen";
import LucasScreen from "@screens/LucasScreen";
import { navigation } from "@navigation/ToolpadNavigations";

export const navigationRoutes: RouterModel[] = [
  {
    path: ScreenUrls.DefaultScreenPath,
    redirectionUrl: ScreenUrls.LucasScreenPath,
    guards: [GuardTypes.NOT_LOGGED_IN_GUARD],
    component: <LucasScreen renderComponent={<DefaultScreen />} />,
  },
  {
    path: ScreenUrls.LoginScreenPath,
    redirectionUrl: ScreenUrls.LucasScreenPath,
    guards: [GuardTypes.NOT_LOGGED_IN_GUARD],
    component: <LucasScreen renderComponent={<LoginScreen />} />,
  },
  {
    path: ScreenUrls.LucasScreenPath,
    redirectionUrl: ScreenUrls.LoginScreenPath,
    guards: [GuardTypes.GOOGLE_ACCOUNT_GUARD],
    component: <LucasScreen navigation={navigation} />,
  },
  {
    path: ScreenUrls.NotFoundScreenPath,
    guards: [],
    component: <LucasScreen renderComponent={<NotFoundScreen />} />,
  },
];
