import BoundingBoxDto from "./BoundingBoxDto";

export default class ProcedureLogDto {
  constructor(
    public id: number,
    public createdAt: string,
    public params: string[],
    public boundingBoxes: BoundingBoxDto[],
    public procedure: string,
    public user: string,
  ) {}
}
