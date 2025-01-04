export default class ProcedureResultModel {
  constructor(public annotation: ProcedureResultAnnotation) {}
}

export type ProcedureResultAnnotation = {
  date: number;
  author: string;
  method: string;
  filename: string;
  path: string;
  size: ProcedureResultAnnotationSize;
  object: ProcedureResultAnnotationObject[];
};

export type ProcedureResultAnnotationSize = {
  width: number;
  height: number;
  depth: number;
};

export type ProcedureResultAnnotationObject = {
  name: string;
  bndbox: ProcedureResultAnnotationObjectBndBox;
  confidence?: number;
};

export type ProcedureResultAnnotationObjectBndBox = {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
};
