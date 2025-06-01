import { ProcedureFileMessages } from "@model/enum";
import ProcedureLogError from "@model/error/ProcedureLogError";
import ProcedureResultModel, {
  ProcedureResultAnnotation,
  ProcedureResultAnnotationImage,
  ProcedureResultAnnotationObject,
  ProcedureResultAnnotationObjectBndBox,
} from "@model/ProcedureResultModel";
import ProcedureResultRequest, {
  ProcedureResultImageProperties,
  ProcedureResultRequestBoundingBox,
  ProcedureResultRequestFile,
  ProcedureResultRequestImages,
  ProcedureResultRequestObject,
  ProcedureResultRequestPlant,
} from "@model/request/ProcedureResultRequest";
import FileUtils from "./fileUtils";
import ImageUtils from "./imageUtils";
import ProcedureProcessModel from "@model/ProcedureProcessModel";
import ImageCommands from "@api/command/imageCommand";
import { BaseErrorResponse } from "@model/response/BaseErrorResponse";

abstract class ProcedureLogUtils {
  /**
   * Filter the provided files by the xml and non-xml files.
   *
   * @param files The files to filter
   */
  public static filterFilesByTypes = (files: File[]) => {
    let xmlFilesToProcess: File[] = [];
    let processedErrorFiles: ProcedureProcessModel[] = [];

    files.forEach((file) => {
      if (file.type === "text/xml") {
        // Filter the xml files
        xmlFilesToProcess = [...xmlFilesToProcess, file];
      } else {
        // Filter the non-xml files and send out them as processed
        const model: ProcedureProcessModel = {
          filename: file.name,
          message: ProcedureFileMessages.FileExtensionIsNotXml,
        };
        processedErrorFiles = [...processedErrorFiles, model];
      }
    });

    return { xmlFilesToProcess, processedErrorFiles };
  };

  private static getObjectParamsOfErrorMessages = (obj = {}) => {
    return Object.keys(obj).length > 0 ? obj : undefined;
  };

  /**
   * Validates whether the provided property is defined.
   * @param property The property to evaluate.
   * @param error The error message enum to display the user if the validation failed.
   * @param obj
   * @throws {ProcedureLogError} error, if the validation failed.
   */
  private static validatesIsDefined = (
    property: any,
    error: ProcedureFileMessages,
    obj = {},
  ): void => {
    if (!property) {
      throw new ProcedureLogError(error, this.getObjectParamsOfErrorMessages(obj));
    }
  };

  /**
   * Validates whether the provided property is defined.
   * @param property The property to evaluate.
   * @param typeName The name of the type, which the property must possess.
   * @param error The error message enum to display the user if the validation failed.
   * @param obj
   * @throws {ProcedureLogError} error, if the validation failed.
   */
  private static validatesIsTypeCorrect = (
    property: any,
    typeName: "number" | "string",
    error: ProcedureFileMessages,
    obj = {},
  ): void => {
    if (typeof property !== typeName) {
      throw new ProcedureLogError(error, this.getObjectParamsOfErrorMessages(obj));
    }
  };

  /**
   * Parse the provided buffer to a {@link ProcedureResultModel}. Checks, if the model
   * is created, and the annotation attribute is present in the object.
   *
   * @param buffer The object to parse into a model
   * @returns Returns a {@link ProcedureResultModel}
   * @throws {ProcedureLogError} error if the object, or the annotation attribute is not present inside the object.
   */
  public static parseBufferToModel = (buffer: Buffer): ProcedureResultModel => {
    const procedureModel = FileUtils.parseBufferToModel(buffer);

    // Validating the model (checking if the model is satisfies the dtd)
    // Is the model created successfully?
    if (!procedureModel) {
      throw new ProcedureLogError(ProcedureFileMessages.XmlObjectIsEmpty);
    }

    // Is the model created successfully?
    if (!procedureModel.annotation) {
      throw new ProcedureLogError(ProcedureFileMessages.XmlAnnotationIsNotDefined);
    }

    return procedureModel;
  };

  public static initLogRequestModel = (
    annotation: ProcedureResultAnnotation,
    xmlFilename: string,
  ): ProcedureResultRequest => {
    return {
      xmlFileName: xmlFilename,
      timestamp: this.getCreationDateFromLog(annotation),
      author: this.getAuthorFromLog(annotation),
      method: this.getMethodNameByLog(annotation),
      params: this.getParamsByLog(annotation),
      images: this.getImagesByLog(annotation),
    };
  };

  /**
   * Extracting the Creation date from the provided param that is the
   * value of the date from the XML file.
   *
   * @param annotation The object format of the uploaded XML file.
   */
  private static getCreationDateFromLog = (annotation: ProcedureResultAnnotation): string => {
    const property: ProcedureLogUtils = annotation.date;

    // Apply validators to the 'date' attribute of the model.
    this.validatesIsDefined(property, ProcedureFileMessages.XmlDateIsNotDefined);
    this.validatesIsTypeCorrect(property, "number", ProcedureFileMessages.XmlDateIncorrectType);

    const date = `${property}`;

    if (date.length !== 12) {
      throw new ProcedureLogError(ProcedureFileMessages.XmlDateNotLongEnough);
    }

    try {
      const year = Number(`${date[0]}${date[1]}${date[2]}${date[3]}`);
      const month = Number(`${date[4]}${date[5]}`);
      const day = Number(`${date[6]}${date[7]}`);
      const hour = Number(`${date[8]}${date[9]}`);
      const min = Number(`${date[10]}${date[11]}`);

      return new Date(
        new Date(new Date().setFullYear(year, month - 1, day)).setHours(hour, min, 0, 0),
      ).toISOString();
    } catch (error) {
      throw new ProcedureLogError(ProcedureFileMessages.XmlDateInvalidFormat);
    }
  };

  /**
   * Extracts the author from the params, while validates this datatype, is provided properly.
   * @param annotation The object format of the uploaded XML file.
   * @returns Returns the author of the log file that contains the XML.
   */
  private static getAuthorFromLog = (annotation: ProcedureResultAnnotation): string => {
    const property = annotation.author;

    // Apply validators to the 'author' attribute of the model.
    this.validatesIsDefined(property, ProcedureFileMessages.XmlAuthorIsNotDefined);
    this.validatesIsTypeCorrect(property, "string", ProcedureFileMessages.XmlAuthorIncorrectType);

    return property;
  };

  /**
   * Extracts the name of the method from the xml file.
   * @param annotation The object format of the uploaded xml file.
   * @returns Returns the name of the method that was used to analyze the image(s).
   */
  private static getMethodNameByLog = (annotation: ProcedureResultAnnotation): string => {
    const property = annotation.method;

    // Apply validators to the 'method' attribute of the model.
    this.validatesIsDefined(property, ProcedureFileMessages.XmlMethodIsNotDefined);
    this.validatesIsTypeCorrect(property, "string", ProcedureFileMessages.XmlMethodIncorrectType);

    return annotation.method.split(" ")[0];
  };

  /**
   * Extracts the list of params that was used with the method.
   * @param annotation The object format of the uploaded xml file.
   * @returns Returns the list of params that was used with on the method.
   */
  private static getParamsByLog = (annotation: ProcedureResultAnnotation): string[] => {
    try {
      return annotation.method
        .split(" ")
        .filter((element) => element.toLowerCase().includes("param"))
        .map((element) => element.split("=")[1].replaceAll('"', ""))
        .filter((element) => element.length > 0);
    } catch (error) {
      throw new ProcedureLogError(ProcedureFileMessages.ErrorExtractingParamName);
    }
  };

  /**
   * Extracts the information from the image.
   * @param annotation The object format of the uploaded xml file.
   * @returns Returns the information that are associated with the image.
   */
  private static getImagesByLog = (
    annotation: ProcedureResultAnnotation,
  ): ProcedureResultRequestImages[] => {
    const property = annotation.image;

    // Apply validators to the 'image' attribute of the model.
    this.validatesIsDefined(property, ProcedureFileMessages.XmlImagesNotDefined);

    if (Array.isArray(property)) {
      // an array of images are provided
      return property.map((image, index) => this.buildImageByAnnotationImage(image, index));
    } else {
      // only one image was provided
      return [this.buildImageByAnnotationImage(property, 0)];
    }
  };

  /**
   * Get the image information extracted from the log, such as filename, methods, params,
   * and found bounding boxes on the image.
   * @param image The image to extract information about.
   * @param imageIndex The position of the image in the xml file.
   * @returns Return the file information and bounding boxes that are associated with the image.
   */
  private static buildImageByAnnotationImage = (
    image: ProcedureResultAnnotationImage,
    imageIndex: number,
  ): ProcedureResultRequestImages => {
    return {
      file: this.getFileByLog(image, imageIndex),
      objects: this.getObjectsByLog(image, imageIndex),
    };
  };

  private static getFileByLog = (
    image: ProcedureResultAnnotationImage,
    imageIndex: number,
  ): ProcedureResultRequestFile => {
    const property = image.filename;
    const indexParam = { index: imageIndex + 1 };

    // Apply validators to the 'filename' attribute of the model.
    this.validatesIsDefined(property, ProcedureFileMessages.XmlFilenameNotDefined, indexParam);
    this.validatesIsTypeCorrect(
      property,
      "string",
      ProcedureFileMessages.XmlFilenameIncorrectType,
      indexParam,
    );

    // Validating the 'filename' format
    const splitFile = property.split("_");

    if (splitFile.length === 3) {
      // Validating the extension of the 'filename'
      const splitFileExtension = property.split(".");

      // Check the extension of the profile file
      if (splitFileExtension.length === 1) {
        throw new ProcedureLogError(
          ProcedureFileMessages.ErrorExtractingImageExtension,
          indexParam,
        );
      }

      return {
        fileName: `${splitFile[1]}.${splitFileExtension[splitFileExtension.length - 1]}`,
        year: Number(splitFile[0]),
        countryCode: "HU", // TODO: This attribute holds no significant information. Remove it later.
      };
    } else if (splitFile.length === 2) {
      // Validating the extension of the 'filename'
      const splitFileExtension = property.split(".");

      // Check the extension of the profile file
      if (splitFileExtension.length === 1) {
        throw new ProcedureLogError(
          ProcedureFileMessages.ErrorExtractingImageExtension,
          indexParam,
        );
      }

      return {
        fileName: splitFile[1],
        year: Number(splitFile[0]),
        countryCode: "HU", // TODO: This attribute holds no significant information. Remove it later.
      };
    } else {
      throw new ProcedureLogError(ProcedureFileMessages.ErrorExtractingImageName, indexParam);
    }
  };

  private static getObjectsByLog = (
    image: ProcedureResultAnnotationImage,
    imageIndex: number,
  ): ProcedureResultRequestObject[] => {
    const property = image.object;
    const indexParam = { index: imageIndex + 1 };

    // Apply validators to the 'object' attribute of the model.
    this.validatesIsDefined(property, ProcedureFileMessages.XmlObjectNotDefined, indexParam);

    if (Array.isArray(property)) {
      // an array of 'objects' are provided
      return property.map((obj, index) => this.getObjectPropertiesByImage(obj, imageIndex, index));
    } else {
      // only one 'object' was provided
      return [this.getObjectPropertiesByImage(property, imageIndex, 0)];
    }
  };

  private static getObjectPropertiesByImage = (
    object: ProcedureResultAnnotationObject,
    imageIndex: number,
    objectIndex: number,
  ): ProcedureResultRequestObject => {
    return {
      plant: this.getPlantNameAndHomogenousFromObject(object, imageIndex, objectIndex),
      boundingBox: {
        xmin: -1,
        ymin: -1,
        xmax: -1,
        ymax: -1,
      },
      centroidBoundingBox: this.getCentroidBoundingBoxFromObject(object, imageIndex, objectIndex),
      confidence: this.getConfidenceFromObject(object, imageIndex, objectIndex),
    };
  };

  private static getCentroidBoundingBoxFromObject = (
    object: ProcedureResultAnnotationObject,
    imageIndex: number,
    objectIndex: number,
  ): ProcedureResultAnnotationObjectBndBox => {
    const property = object.bndbox;
    const indexParams = { imageIndex: imageIndex + 1, objectIndex: objectIndex + 1 };

    this.validatesIsDefined(property, ProcedureFileMessages.XmlBoundingBoxNotDefined, indexParams);
    this.validatesIsDefined(
      property.centerx,
      ProcedureFileMessages.XmlCenterXNotDefined,
      indexParams,
    );
    this.validatesIsDefined(
      property.centery,
      ProcedureFileMessages.XmlCenterYNotDefined,
      indexParams,
    );
    this.validatesIsDefined(
      property.height,
      ProcedureFileMessages.XmlHeightNotDefined,
      indexParams,
    );
    this.validatesIsDefined(property.width, ProcedureFileMessages.XmlWidthNotDefined, indexParams);

    this.validatesIsTypeCorrect(
      property.centerx,
      "number",
      ProcedureFileMessages.XmlCenterXIncorrectType,
      indexParams,
    );
    this.validatesIsTypeCorrect(
      property.centery,
      "number",
      ProcedureFileMessages.XmlCenterYIncorrectType,
      indexParams,
    );
    this.validatesIsTypeCorrect(
      property.height,
      "number",
      ProcedureFileMessages.XmlHeightIncorrectType,
      indexParams,
    );
    this.validatesIsTypeCorrect(
      property.width,
      "number",
      ProcedureFileMessages.XmlWidthIncorrectType,
      indexParams,
    );

    return property;
  };

  /**
   * Extracts the confidence XML element from the 'object' XML element.
   * @param object The 'object' XML element that will be used to extract the 'confidence'
   * @param imageIndex The index of the 'image' XML element in which this 'object' is present.
   * @param objectIndex The index of the 'object' XML element in which this 'confidence' is present.
   * @returns Returns undefined, if the 'confidence' was not provided, else the rounded value of the XML element,
   * if the type of the 'confidence' XML element is "number", and it's value is in the range between 0 and 1.
   */
  private static getConfidenceFromObject = (
    object: ProcedureResultAnnotationObject,
    imageIndex: number,
    objectIndex: number,
  ): number | undefined => {
    const property = object.confidence;
    const indexParams = { imageIndex: imageIndex + 1, objectIndex: objectIndex + 1 };

    if (!property) {
      return undefined;
    }

    // Apply validators to the 'confidence' attribute of the model.
    this.validatesIsTypeCorrect(
      property,
      "number",
      ProcedureFileMessages.XmlConfidenceIncorrectType,
      indexParams,
    );

    const roundedConfidence = Math.round(property * 100);

    // Is the 'confidence' not between the [0, 100] interval?
    if (roundedConfidence < 0 || roundedConfidence > 100) {
      throw new ProcedureLogError(ProcedureFileMessages.ErrorConfidenceIsNotInRange, indexParams);
    }

    // Return the 'confidence' in a rounded number format.
    return roundedConfidence;
  };

  /**
   * Extracts the 'name' XML element from the 'object' XML element.
   * @param object The 'object' XML element that will be used to extract the 'confidence'
   * @param imageIndex The index of the 'image' XML element in which this 'object' is present.
   * @param objectIndex The index of the 'object' XML element in which this 'confidence' is present.
   * @returns Returns the name of the plant that has been detected on the image.
   */
  private static getPlantNameAndHomogenousFromObject = (
    object: ProcedureResultAnnotationObject,
    imageIndex: number,
    objectIndex: number,
  ): ProcedureResultRequestPlant => {
    const property = object.name;
    const indexParams = { imageIndex: imageIndex + 1, objectIndex: objectIndex + 1 };

    // Apply validators to the 'confidence' attribute of the model.
    this.validatesIsDefined(property, ProcedureFileMessages.XmlNameNotDefined, indexParams);
    this.validatesIsTypeCorrect(
      property,
      "string",
      ProcedureFileMessages.XmlNameIncorrectType,
      indexParams,
    );

    const splitFileName = object.name.split(" ");

    if (splitFileName.length < 2) {
      throw new ProcedureLogError(
        ProcedureFileMessages.ErrorObjectNameIsInvalidFormat,
        indexParams,
      );
    }

    const listOfTags = ["1db", "Homogén", "Homogen"];
    const indexParamsWithTags = { ...indexParams, tags: listOfTags.join(", ") };
    const isFilenameTagContainsOneOfTag = listOfTags.some((tag) => splitFileName.includes(tag));

    if (!isFilenameTagContainsOneOfTag) {
      throw new ProcedureLogError(
        ProcedureFileMessages.ErrorInvasiveResultIsNotPresent,
        indexParamsWithTags,
      );
    }

    return {
      plantName: splitFileName.filter((_, index) => index !== splitFileName.length - 1).join(" "),
      isInvasive: splitFileName[splitFileName.length - 1] === "1db",
    };
  };

  public static getFilenameAndCreationYears = (
    listOfRequests: ProcedureResultRequest[],
  ): ProcedureResultRequestFile[] => {
    return listOfRequests
      .map((request) => request.images.map((image) => image.file))
      .flat()
      .filter((locObj, locIndex, listOfElements) =>
        listOfElements.every(
          (globObj, globIndex) =>
            locIndex >= globIndex || JSON.stringify(locObj) !== JSON.stringify(globObj),
        ),
      );
  };

  public static getListOfImageModelsByFiles = async (listOfFiles: ProcedureResultRequestFile[]) => {
    try {
      const images = await ImageCommands.postByImageNameAndCreationYear(listOfFiles);

      const imageUrlPaths = images
        .map((imageModel) => ImageUtils.initRemoteImageUrlPath(imageModel))
        .filter((imageUrl) => imageUrl !== undefined);

      return imageUrlPaths as string[];
    } catch (error: any) {
      const specializedError: BaseErrorResponse = JSON.parse(error);
      const errorImage = this.convertYearAndImageNameToFullImageName(
        specializedError.param0,
        specializedError.param1,
      );

      throw new ProcedureLogError(ProcedureFileMessages.ImageNotFoundOnServer, {
        imagePath: errorImage,
      });
    }
  };

  /**
   * Based on the provided params, construct the full name of the image.
   *
   * Example:
   *
   * Input: **year** = 2012, **imageName** = 52222798E123.jpg
   *
   * Output: **2012_52222798E123.jpg**
   *
   * @param year The year when the image was taken.
   * @param imageName The name of the image.
   * @returns Returns the full image name provided in the xml file.
   */
  public static convertYearAndImageNameToFullImageName = (
    year?: string | number,
    imageName?: string | number,
  ) => {
    return [`${year}`, `${imageName}`].join("_");
  };

  public static getImagePathsAndProperties = async (
    imageUrlPaths: string[],
  ): Promise<ProcedureResultImageProperties[]> => {
    let res: ProcedureResultImageProperties[] = [];

    for await (const imagePath of imageUrlPaths) {
      // Download the image and send back the image itself.
      const imageSprite = await ImageUtils.initImageByRemoteUrlPath(imagePath);

      // The original width and height of the image
      const naturalWidth = imageSprite.naturalWidth;
      const naturalHeight = imageSprite.naturalHeight;

      const properties: ProcedureResultImageProperties = {
        imagePath: imagePath,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
      };

      res = [...res, properties];
    }

    return res;
  };

  public static finalizeResultRequests = (
    requestModels: ProcedureResultRequest[],
    imageProperties: ProcedureResultImageProperties[],
  ): ProcedureResultRequest[] => {
    return requestModels.map((request) => ({
      ...request,
      images: request.images.map((image) => ({
        ...image,
        objects: image.objects.map((object) => ({
          ...object,
          boundingBox: this.getBoundingBoxFromObject(object, image.file, imageProperties),
          centroidBoundingBox: undefined,
        })),
      })),
    }));
  };

  private static getBoundingBoxFromObject = (
    object: ProcedureResultRequestObject,
    file: ProcedureResultRequestFile,
    imageProperties: ProcedureResultImageProperties[],
  ): ProcedureResultRequestBoundingBox => {
    if (!object.centroidBoundingBox) {
      // TODO: Throw a better error.
      throw new ProcedureLogError(ProcedureFileMessages.ImageNotFoundOnServer, { imagePath: file });
    }

    // Get the image and it's properties based on the 'file' param.
    const selectedProperty = imageProperties.find(
      (property) =>
        property.imagePath.includes(`/${file.year}/`) &&
        property.imagePath.includes(`/${file.countryCode}/`) &&
        property.imagePath.includes(`/${file.fileName}`),
    );

    if (!selectedProperty) {
      // TODO: Throw a better error.
      throw new ProcedureLogError(ProcedureFileMessages.ImageNotFoundOnServer, { imagePath: file });
    }

    const halfWidth = (selectedProperty.naturalWidth * object.centroidBoundingBox.width) / 2;
    const halfHeight = (selectedProperty.naturalHeight * object.centroidBoundingBox.height) / 2;

    return {
      xmin: object.centroidBoundingBox.centerx * selectedProperty.naturalWidth - halfWidth,
      ymin: object.centroidBoundingBox.centery * selectedProperty.naturalHeight - halfHeight,
      xmax: object.centroidBoundingBox.centerx * selectedProperty.naturalWidth + halfWidth,
      ymax: object.centroidBoundingBox.centery * selectedProperty.naturalHeight + halfHeight,
    };
  };
}

export default ProcedureLogUtils;
