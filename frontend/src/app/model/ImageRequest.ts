export default class ImageRequest {
    constructor(
        public year: number,
        public countryCode: string,
        public coordinateY: string,
        public coordinateX: string,
        public imageName: string,
        public isImageFromLocalEnvironment: boolean,
    ){}
}