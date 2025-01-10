import { GuardTypes, ScreenUrls } from "./enum";

export default class RouterModel {
  constructor(
    public path: ScreenUrls,
    public guards: GuardTypes[],
    public component: JSX.Element,
    public redirectionUrl?: ScreenUrls
  ) {}
}
