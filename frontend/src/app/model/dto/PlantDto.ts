export default class PlantDto {
  constructor(
    public isPlantInvasive: boolean,
    public plantSpeciesName: string,
    public plantScientificName: string,
  ) {}
}
