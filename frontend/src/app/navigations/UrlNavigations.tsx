import { guardGoogleAccount } from "../guards/guardGoogleAccount";
import { ScreenUrls } from "../model/enum";
import RouterModel from "../model/RouterModel";
import DefaultScreen from "../screens/DefaultScreen";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import LucasScreen from "../screens/LucasScreen";
import { toolpadNavigations } from "./ToolpadNavigations";

export const urlNavigations: RouterModel[] = [
  {
    path: ScreenUrls.DefaultScreenPath,
    redirectionUrl: ScreenUrls.LucasScreenPath,
    guards: [!guardGoogleAccount()],
    component: <LucasScreen renderComponent={<DefaultScreen />} />
  },
  {
    path: ScreenUrls.LoginScreenPath,
    redirectionUrl: ScreenUrls.LucasScreenPath,
    guards: [!guardGoogleAccount()],
    component: <LucasScreen renderComponent={<LoginScreen />} />
  },
  {
    path: ScreenUrls.LucasScreenPath,
    redirectionUrl: ScreenUrls.LoginScreenPath,
    guards: [guardGoogleAccount()],
    component: <LucasScreen toolpadNavigations={toolpadNavigations} />
  },
  {
    path: ScreenUrls.NotFoundScreenPath,
    guards: [],
    component: <LucasScreen renderComponent={<NotFoundScreen />} />,
  },
];
