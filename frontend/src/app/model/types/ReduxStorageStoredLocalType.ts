import CoordinateXDto from "@model/dto/CoordinateXDto";
import CoordinateYDto from "@model/dto/CoordinateYDto";
import CreationCountryDto from "@model/dto/CreationCountryDto";
import CreationDirectionDto from "@model/dto/CreationDirectionDto";
import CreationYearDto from "@model/dto/CreationYearDto";
import ExifKeyDto from "@model/dto/ExifKeyDto";

export type ReduxStorageStoredLocalType = {
  storage: {
    years: CreationYearDto[];
    country: CreationCountryDto[];
    x: CoordinateXDto[];
    y: CoordinateYDto[];
    direction: CreationDirectionDto[];
    exifKey: ExifKeyDto[];
  };
  expirationDateTime: string;
};
