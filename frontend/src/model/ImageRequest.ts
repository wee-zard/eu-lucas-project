export default class ImageRequest {
    constructor(
        public year: number,
        public countryCode: string,
        public longitude: string,
        public latitude: string,
        public imageName: string,
        public isImageFromLocalEnvironment: boolean,
    ){}
}