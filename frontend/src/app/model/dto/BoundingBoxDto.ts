import PlantDto from "./PlantDto";

export default class BoundingBoxDto {
  constructor(
    public id: number,
    public probabilityOfDetection: number,
    public minCoordinateX: number,
    public maxCoordinateX: number,
    public minCoordinateY: number,
    public maxCoordinateY: number,
    public isHomogenous: boolean,
    public plant: PlantDto,
  ) {}
}
