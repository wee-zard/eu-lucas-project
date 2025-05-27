import React from "react";
import { styled } from "@mui/material/styles";
import FileUtils from "@helper/fileUtils";
import ProcedureProcessModel from "@model/ProcedureProcessModel";
import { ProcedureFileMessages } from "@model/enum";
import { ReactComponent as UploadIcon } from "@media/upload-to-cloud.svg";
import i18n from "@i18n/i18nHandler";
import ProcedureLogError from "@model/error/ProcedureLogError";
import ProcedureLogUtils from "@helper/procedureLogUtils";
import { useDispatch } from "react-redux";
import { setProcedureUploadProcessModels } from "@redux/actions/procedureUploadActions";
import { useSelector } from "react-redux";
import { ToastSeverity, openSnackbar, throwNotification } from "@helper/notificationUtil";
import { uploadProcedureResult } from "@api/command/procedureCommands";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { selectIsBackdropOpen } from "@redux/selectors/settingSelector";
import ProcedureResultRequest from "@model/request/ProcedureResultRequest";
import { SnackEnum } from "@model/enum/SnackEnum";

const UploadProcedureActions = () => {
  const isBackdropOpen = useSelector(selectIsBackdropOpen);
  const dispatch = useDispatch();

  /**
   * Processes the user provided xml file, and extracts the files from the event.
   * If the uploaded files does not end with the .xml extension, then error will be thrown
   * to those uploaded files. The remaining files will be sent to the next step of processing.
   *
   * @param event The event that holds the uploaded xml file to process
   */
  const handleEventProcess = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // Step 1.0: Start the process.
    dispatch(setSettingBackdropOpen(true));

    // Step 1.1: Converting event into File list.
    const files = FileUtils.getListOfUploadedFilesFromEvent(event);

    // Step 1.2: Filtering the xml files from the uploaded files.
    // Step 1.3: Filtering the non-xml files and display an error message to them.
    const { xmlFilesToProcess, processedErrorFiles } = ProcedureLogUtils.filterFilesByTypes(files);

    // Step 1.4.: If there is no file to process, then terminate the process and stop the backdrop.
    if (xmlFilesToProcess.length === 0) {
      dispatch(setProcedureUploadProcessModels(processedErrorFiles));
      dispatch(setSettingBackdropOpen(false));
      return;
    }

    // Step 1.5: Call the xml processor
    handleXmlFilesProcess(xmlFilesToProcess, processedErrorFiles);
  };

  const handleXmlFilesProcess = async (
    xmlFilesToProcess: File[],
    processedErrorFiles: ProcedureProcessModel[],
  ) => {
    let listOfRequest: ProcedureResultRequest[] = [];

    // Step 2.1: Extract one file from the valid list of xml files to process it
    for await (const file of xmlFilesToProcess) {
      try {
        // Step 2.2: Convert file to Buffer.
        const buffer = await FileUtils.fileToBuffer(file);

        // Step 2.3: Parsing buffer to model.
        const procedureModel = ProcedureLogUtils.parseBufferToModel(buffer);

        // Step 2.4: Converting the parsed model to a request model.
        const request = ProcedureLogUtils.initLogRequestModel(procedureModel.annotation);

        // Step 2.5: Add the new request to the pool.
        listOfRequest = [...listOfRequest, request];
      } catch (error) {
        if (!(error instanceof ProcedureLogError)) {
          console.error("Uncaught error occurred!", error);
          return;
        }

        const procedureProcessFile: ProcedureProcessModel = {
          filename: file.name,
          message: error.message as ProcedureFileMessages,
          options: error.obj,
        };
        processedErrorFiles = [...processedErrorFiles, procedureProcessFile];
      }
    }

    // Step 2.6.: Checks if there is any request to process
    if (listOfRequest.length === 0) {
      dispatch(setProcedureUploadProcessModels(processedErrorFiles));
      dispatch(setSettingBackdropOpen(false));
      return;
    }

    processProcedureRequests(listOfRequest, processedErrorFiles);
  };

  const processProcedureRequests = async (
    listOfRequest: ProcedureResultRequest[],
    processedErrorFiles: ProcedureProcessModel[],
  ) => {
    // Step 3.1: Get the images and their properties based on the requests.
    const requestFiles = ProcedureLogUtils.getFilenameAndCreationYears(listOfRequest);

    try {
      // Step 3.2: Get the list of image paths.
      const imagePaths = await ProcedureLogUtils.getListOfImageModelsByFiles(requestFiles);

      // Step 3.3: Set the bounding boxes for the requestModel.
      const imageProperties = await ProcedureLogUtils.getImagePathsAndProperties(imagePaths);

      // Step 3.4: Finalize the request build
      const res = ProcedureLogUtils.finalizeResultRequests(listOfRequest, imageProperties);

      // Step 3.5: Send the request model to the server.
      await uploadProcedureResult(res);
      openSnackbar(SnackEnum.UPLOADED_XML_FILES);
    } catch (error: any) {
      throwNotification(ToastSeverity.Error, error.message);
    } finally {
      dispatch(setProcedureUploadProcessModels(processedErrorFiles));
      dispatch(setSettingBackdropOpen(false));
    }
  };

  return (
    <StyledBoxHolder>
      <StyledDragAndDropHolder>
        <UploadIcon width={100} height={100} fill="gray" />
        {i18n.t("screens.upload-procedures.view.drag-and-drop")}
      </StyledDragAndDropHolder>
      <StyledHiddenInput
        type="file"
        accept=".xml"
        multiple
        onChange={handleEventProcess}
        disabled={isBackdropOpen}
      />
    </StyledBoxHolder>
  );
};

export default UploadProcedureActions;

const StyledHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  opacity: 0,
  height: 350,
  position: "relative",
  whiteSpace: "nowrap",
  width: "100%",
  cursor: "pointer",
});

const StyledBoxHolder = styled("div")({
  margin: "0 10%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "3px dashed gray",
  boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.27)",
  height: 350,
  ":hover": {
    border: "3px dashed rgb(138, 241, 255)",
    boxShadow: "0px 4px 12px rgba(0, 255, 255, 0.3)",
    backgroundColor: "rgba(120, 239, 255, 0.05)",
  },
});

const StyledDragAndDropHolder = styled("div")({
  position: "absolute",
  display: "grid",
  gap: "8px",
  justifyItems: "center",
  fontSize: "x-large",
});
