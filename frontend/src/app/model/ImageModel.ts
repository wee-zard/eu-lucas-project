export default class ImageModel {
    constructor(
        public id: number,
        public imageName: string,
        public gpsLongitudeCircle: number,
        public gpsLatitudeCircle: number,
        public direction: Direction,
        public country: Country,
        public year: Year,
    ) {}
}

export type Year = {
    year: number;
}

export type Country = {
    countryCode: string,
    countryName: string
}

export type Direction = {
    direction: string,
}