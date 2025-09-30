import BoundingBoxDto from "./BoundingBoxDto";
import ImageDto from "./ImageDto";

export default class ProcedureLogDto {
  constructor(
    public id: number,
    public createdAt: string,
    public params: string[],
    public boundingBoxes: BoundingBoxDto[],
    public procedure: string,
    public filename: string,
    public user: string,
    public image: ImageDto,
  ) {}
}
