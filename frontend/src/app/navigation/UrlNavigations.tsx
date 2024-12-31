import guardGoogleAccount from "@guards/guardGoogleAccount";
import { ScreenUrls } from "@model/enum";
import RouterModel from "@model/RouterModel";
import DefaultScreen from "@screens/DefaultScreen";
import LoginScreen from "@screens/LoginScreen";
import NotFoundScreen from "@screens/NotFoundScreen";
import LucasScreen from "@screens/LucasScreen";
import { navigation } from "@navigation/ToolpadNavigations";

export const urlNavigation: RouterModel[] = [
  {
    path: ScreenUrls.DefaultScreenPath,
    redirectionUrl: ScreenUrls.LucasScreenPath,
    guards: [!guardGoogleAccount(true)],
    component: <LucasScreen renderComponent={<DefaultScreen />} />
  },
  {
    path: ScreenUrls.LoginScreenPath,
    redirectionUrl: ScreenUrls.LucasScreenPath,
    guards: [!guardGoogleAccount(true)],
    component: <LucasScreen renderComponent={<LoginScreen />} />
  },
  {
    path: ScreenUrls.LucasScreenPath,
    redirectionUrl: ScreenUrls.LoginScreenPath,
    guards: [guardGoogleAccount(false)],
    component: <LucasScreen navigation={navigation} />
  },
  {
    path: ScreenUrls.NotFoundScreenPath,
    guards: [],
    component: <LucasScreen renderComponent={<NotFoundScreen />} />,
  },
];
