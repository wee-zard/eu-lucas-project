export default class ProcedureResultModel {
  constructor(public annotation: ProcedureResultAnnotation) {}
}

export type ProcedureResultAnnotation = {
  date: number;
  author: string;
  method: string;
  image: ProcedureResultAnnotationImage[];
};

export type ProcedureResultAnnotationImage = {
  filename: string;
  path: string;
  object: ProcedureResultAnnotationObject[];
};

export type ProcedureResultAnnotationObject = {
  name: string;
  bndbox: ProcedureResultAnnotationObjectBndBox;
  confidence?: number;
};

export type ProcedureResultAnnotationObjectBndBox = {
  height: number;
  width: number;
  centerx: number;
  centery: number;
};
