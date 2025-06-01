import { ProcedureResultAnnotationObjectBndBox } from "@model/ProcedureResultModel";

export default class ProcedureResultRequest {
  constructor(
    public xmlFileName: string,
    public timestamp: string,
    public author: string,
    public method: string,
    public params: string[],
    public images: ProcedureResultRequestImages[],
  ) {}
}

export type ProcedureResultRequestImages = {
  file: ProcedureResultRequestFile;
  objects: ProcedureResultRequestObject[];
};

export type ProcedureResultRequestFile = {
  fileName: string;
  year: number;
  countryCode: string;
};

export type ProcedureResultRequestObject = {
  plant: ProcedureResultRequestPlant;
  boundingBox: ProcedureResultRequestBoundingBox;
  centroidBoundingBox?: ProcedureResultAnnotationObjectBndBox;
  confidence?: number;
};

export type ProcedureResultRequestPlant = {
  plantName: string;
  isInvasive: boolean;
};

export type ProcedureResultRequestBoundingBox = {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
};

export type ProcedureResultImageProperties = {
  imagePath: string;
  naturalWidth: number;
  naturalHeight: number;
};
