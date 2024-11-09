import { ScreenUrls } from "./enum";

export default class RouterModel {
    constructor(
        public path: ScreenUrls,
        public guards: (() => boolean)[],
        public component: JSX.Element
    ){}
}