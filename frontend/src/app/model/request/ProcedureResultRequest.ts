import { ProcedureResultAnnotationObjectBndBox } from "@model/ProcedureResultModel";

export default class ProcedureResultRequest {
  constructor(
    public timestamp: string,
    public method: string,
    public params: string[],
    public file: ProcedureResultRequestFile,
    public objects: ProcedureResultRequestObject[],
  ) {}
}

export type ProcedureResultRequestFile = {
  fileName: string;
  year: number;
  countryCode: string;
};

export type ProcedureResultRequestObject = {
  plantName: string;
  isInvasive: boolean;
  boundingBox: ProcedureResultAnnotationObjectBndBox;
  confidence?: number;
};