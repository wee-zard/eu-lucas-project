export enum UploadProcedureLogStageEnum {
  EVENT_TO_FILES = "screens.upload-procedures.stage.convertingEventIntoFileList",
  FILTER_OUT_NON_XML_FILES = "screens.upload-procedures.stage.filterOutNonXmlFiles",
  PROCESS_XML_FILE = "screens.upload-procedures.stage.processXmlFile",
  GET_FILENAME_AND_YEARS = "screens.upload-procedures.stage.getFilenameAndCreationYear",
  GET_IMAGE_PROPERTIES = "screens.upload-procedures.stage.getImageProperties",
  GET_IMAGE_WIDTH_AND_HEIGHT = "screens.upload-procedures.stage.getImagePathAndWidthAndHeight",
  CREATE_PROCEDURE_LOG_REQUEST = "screens.upload-procedures.stage.createProcedureLogRequest",
  UPLOAD_LOGS_TO_SERVER = "screens.upload-procedures.stage.uploadLogsToServer",
}
