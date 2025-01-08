import { ProcedureFileMessages } from "@model/enum";
import ProcedureLogError from "@model/error/ProcedureLogError";
import { ProcedureResultAnnotationObject } from "@model/ProcedureResultModel";
import {
  ProcedureResultRequestFile,
  ProcedureResultRequestObject,
} from "@model/request/ProcedureResultRequest";

const ProcedureLogUtils = {
  getCreatingDateOLog: (dateTime: number) => {
    try {
      const date = `${dateTime}`;
      const year = Number(`${date[0]}${date[1]}${date[2]}${date[3]}`);
      const month = Number(`${date[4]}${date[5]}`);
      const day = Number(`${date[6]}${date[7]}`);
      const hour = Number(`${date[8]}${date[9]}`);
      const min = Number(`${date[10]}${date[11]}`);
      return new Date(
        new Date(new Date().setFullYear(year, month - 1, day)).setHours(
          hour,
          min,
          0,
          0
        )
      ).toISOString();
    } catch (error) {
      throw new ProcedureLogError(ProcedureFileMessages.XmlDateInvalidFormat);
    }
  },

  getMethodNameByLog: (method: string) => {
    try {
      return method.split(" ")[0];
    } catch (error) {
      throw new ProcedureLogError(
        ProcedureFileMessages.ErrorExtractingProcedureMethodName
      );
    }
  },

  getParamsByLog: (method: string) => {
    try {
      return method
        .split(" ")
        .filter((element) => element.toLowerCase().includes("param"))
        .map((element) => element.split("=")[1].replaceAll('"', ""))
        .filter((element) => element.length > 0);
    } catch (error) {
      throw new ProcedureLogError(
        ProcedureFileMessages.ErrorExtractingProcedureMethodName
      );
    }
  },

  getFileByLog: (file: string): ProcedureResultRequestFile => {
    try {
      const splitFile = file.split("_");
      const splitFileExtension = file.split(".");
      return {
        fileName: `${splitFile[1]}.${splitFileExtension[splitFileExtension.length - 1]}`,
        year: Number(splitFile[0]),
        countryCode: "HU",
      };
    } catch (error) {
      throw new ProcedureLogError(
        ProcedureFileMessages.ErrorExtractingImageName
      );
    }
  },

  getObjectsByLog: (
    objects: ProcedureResultAnnotationObject[]
  ): ProcedureResultRequestObject[] => {
    return objects.map((object) => {
      const splitFileName = object.name.split(" ");
      if (!object.name.includes("1db") && !object.name.includes("Homogén")) {
        throw new ProcedureLogError(
          ProcedureFileMessages.ErrorInvasiveResultIsNotPresent
        );
      }
      if (splitFileName.length < 2) {
        throw new ProcedureLogError(
          ProcedureFileMessages.ErrorObjectNameIsInvalidFormat
        );
      }
      return {
        plantName: splitFileName
          .filter((_, index) => index !== splitFileName.length - 1)
          .join(" "),
        isInvasive: splitFileName[splitFileName.length - 1] === "1db",
        boundingBox: object.bndbox,
        confidence: object.confidence ? Math.round(object.confidence * 100) : undefined,
      };
    });
  },
};

export default ProcedureLogUtils;
