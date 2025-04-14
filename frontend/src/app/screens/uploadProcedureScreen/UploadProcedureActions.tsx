import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import StyledBackdrop from "@components/StyledBackdrop";
import FileUtils from "@helper/fileUtils";
import ProcedureProcessModel from "@model/ProcedureProcessModel";
import { ProcedureFileMessages } from "@model/enum";
import { ReactComponent as UploadIcon } from "@media/upload-to-cloud.svg";
import i18n from "@i18n/i18nHandler";
import { uploadProcedureCommonStyles } from "./UploadProcedureScreen";
import ProcedureLogError from "@model/error/ProcedureLogError";
import ProcedureResultRequest from "@model/request/ProcedureResultRequest";
import ProcedureLogUtils from "@helper/procedureLogUtils";
import { useDispatch } from "react-redux";
import { setProcedureUploadProcessModels } from "@redux/actions/procedureUploadActions";
import { useSelector } from "react-redux";
import { selectListOfProcedureProcesses } from "@redux/selectors/procedureUploadSelectors";
import { NotificationSeverity, throwNotification } from "@helper/notificationUtil";
import { uploadProcedureResult } from "@api/command/procedureCommands";

const UploadProcedureActions = () => {
  const [submitEvent, setSubmitEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
  const [listOfXmlFiles, setListOfXmlFiles] = useState<File[]>([]);
  const [procedureResultRequest, setProcedureResultRequest] = useState<ProcedureResultRequest[]>(
    [],
  );
  const listOfProcedureProcesses = useSelector(selectListOfProcedureProcesses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!submitEvent) {
      return;
    }

    // Step 1.1: Converting event into File list.
    const files = FileUtils.getListOfUploadedFilesFromEvent(submitEvent);

    // Step 1.2: Filtering the xml files from the uploaded files.
    const xmlFiles: File[] = files.filter((file) => file.type === "text/xml");

    // Step 1.3: Filtering the non-xml files and displaying an error message to them.
    const procedureProcessFiles: ProcedureProcessModel[] = files
      .filter((file) => file.type !== "text/xml")
      .map((file) => ({
        filename: file.name,
        message: ProcedureFileMessages.FileExtensionIsNotXml,
      }));

    setListOfXmlFiles(xmlFiles);
    dispatch(setProcedureUploadProcessModels(procedureProcessFiles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitEvent]);

  const processFileFromXmlFiles = async (file: File) => {
    // Step 2.2: Convert file to Buffer.
    const buffer = await FileUtils.fileToBuffer(file);

    // Step 2.3: Parsing buffer to model.
    const procedureModel = ProcedureLogUtils.parseBufferToModel(buffer);

    // Step 2.4: Converting the parsed model to a request model.
    const request = ProcedureLogUtils.initLogRequestModel(procedureModel.annotation);

    // Step 2.5: Add the new request to the pool.
    setProcedureResultRequest((prev) => [...prev, request]);
  };

  const addNewErrorFile = (message: ProcedureFileMessages, filename: string, options?: {}) => {
    const procedureProcessFile: ProcedureProcessModel = { filename, message, options };
    dispatch(setProcedureUploadProcessModels([...listOfProcedureProcesses, procedureProcessFile]));
  };

  useEffect(() => {
    if (listOfXmlFiles.length === 0) {
      return;
    }

    // Step 2.0: Extract one file from the valid list of xml files to process it
    const file = listOfXmlFiles[0];

    processFileFromXmlFiles(file)
      .catch((error) => {
        if (!(error instanceof ProcedureLogError)) {
          console.error("Uncaught error occurred!", error);
          return;
        }

        addNewErrorFile(error.message as ProcedureFileMessages, file.name, error.obj);
      })
      .finally(() => {
        setListOfXmlFiles(listOfXmlFiles.filter((_, index) => index !== 0));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listOfXmlFiles]);

  const processProcedureRequests = async () => {
    // Step 3.1: Get the images and their properties based on the requests.
    const requestFiles = ProcedureLogUtils.getFilenameAndCreationYears(procedureResultRequest);

    try {
      // Step 3.2: Get the list of image paths.
      const imagePaths = await ProcedureLogUtils.getListOfImageModelsByFiles(requestFiles);

      // Step 3.3: Set the bounding boxes for the requestModel.
      const imageProperties = await ProcedureLogUtils.getImagePathsAndProperties(imagePaths);

      // Step 3.4: Finalize the request build
      const res = ProcedureLogUtils.finalizeResultRequests(procedureResultRequest, imageProperties);

      // Step 3.5: Send the request model to the server.
      await uploadProcedureResult(res);
      throwNotification(
        NotificationSeverity.Success,
        "XML fájlok sikeresen feltöltésre kerültek a szerverre!",
      );
    } catch (error: any) {
      throwNotification(NotificationSeverity.Error, error.message);
    } finally {
      setSubmitEvent(undefined);
    }
  };

  useEffect(() => {
    if (listOfXmlFiles.length !== 0 || procedureResultRequest.length === 0) {
      return;
    }

    processProcedureRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [procedureResultRequest, listOfXmlFiles]);

  const displayDragAndDropComponent = () => {
    return submitEvent ? null : (
      <React.Fragment>
        <UploadIcon width={100} height={100} fill="gray" />
        {i18n.t("screens.upload-procedures.view.drag-and-drop")}
      </React.Fragment>
    );
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitEvent(event);
    setListOfXmlFiles([]);
    setProcedureResultRequest([]);
    dispatch(setProcedureUploadProcessModels([]));
  };

  return (
    <StyledBoxHolder>
      <StyledDragAndDropHolder>{displayDragAndDropComponent()}</StyledDragAndDropHolder>
      {!submitEvent ? (
        <React.Fragment>
          <VisuallyHiddenInput type="file" onChange={handleOnChange} accept={".xml"} multiple />
        </React.Fragment>
      ) : (
        <StyledBackdrop isBackdropOpen={!!submitEvent} />
      )}
    </StyledBoxHolder>
  );
};

export default UploadProcedureActions;

const VisuallyHiddenInput = styled("input")<{}>((_) => ({
  clip: "rect(0 0 0 0)",
  opacity: 0,
  height: 350,
  position: "relative",
  whiteSpace: "nowrap",
  width: "100%",
  cursor: "pointer",
}));

const StyledBoxHolder = styled("div")<{}>((_) => ({
  ...uploadProcedureCommonStyles,
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
}));

const StyledDragAndDropHolder = styled("div")<{}>((_) => ({
  position: "absolute",
  display: "grid",
  gap: "8px",
  justifyItems: "center",
  fontSize: "x-large",
}));
