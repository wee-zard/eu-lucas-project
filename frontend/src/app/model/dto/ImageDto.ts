import ExifDataDto from "./ExifDataDto";

export default class ImageDto {
  constructor(
    public id: number,
    public imageName: string,
    public direction: string,
    public country: string,
    public year: number,
    public coordinateX: number,
    public coordinateY: number,
    public exifDataList: ExifDataDto[],
    // === From here, not part of the response ===
    public base64Src?: string,
    public areBoundingBoxesHidden?: boolean,
  ) {}
}
