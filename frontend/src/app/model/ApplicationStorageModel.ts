import CoordinateXDto from "./dto/CoordinateXDto";
import CoordinateYDto from "./dto/CoordinateYDto";
import CreationCountryDto from "./dto/CreationCountryDto";
import CreationDirectionDto from "./dto/CreationDirectionDto";
import CreationYearDto from "./dto/CreationYearDto";
import ExifKeyDto from "./dto/ExifKeyDto";
import ProcedureDto from "./dto/ProcedureDto";

export default class ApplicationStorageModel {
  constructor(
    public creationYear: CreationYearDto[] = [],
    public coordinateX: CoordinateXDto[] = [],
    public coordinateY: CoordinateYDto[] = [],
    public creationDirection: CreationDirectionDto[] = [],
    public creationCountry: CreationCountryDto[] = [],
    public procedure: ProcedureDto[] = [],
    public exifKey: ExifKeyDto[] = [],
  ) {}
}
