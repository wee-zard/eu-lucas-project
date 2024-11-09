import { ScreenUrls } from "../model/enum";

export const redirectToUrl = (url: ScreenUrls) => window.location.href = url;
