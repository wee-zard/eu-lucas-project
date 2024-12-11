export default class ImageDto {
    constructor(
        public id: number,
        public imageName: string,
        public direction: string,
        public country: string,
        public year: number,
        public coordinateX: number,
        public coordinateY: number,
    ){}
}