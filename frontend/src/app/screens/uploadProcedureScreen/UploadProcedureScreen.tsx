import { StyledComponentGap } from "@global/globalStyles";
import { styled } from "@mui/material/styles";
import FileUtils from "@helper/fileUtils";
import { Typography } from "@mui/material";
import { ReactComponent as UploadIcon } from "@media/upload-to-cloud.svg";
import React, { useEffect, useState } from "react";
import ProcedureProcessModel from "@model/ProcedureProcessModel";
import UploadFileAccordionCard from "./UploadFileAccordionCard";
import { ProcedureFileMessages } from "@model/enum";
import ProcedureResultRequest from "@model/request/ProcedureResultRequest";
import ProcedureLogError from "@model/error/ProcedureLogError";
import ProcedureLogUtils from "@helper/procedureLogUtils";

const UploadProcedureScreen = () => {
  const [submitEvent, setSubmitEvent] =
    useState<React.ChangeEvent<HTMLInputElement>>();
  const [listOfFiles, setListOfFiles] = useState<File[]>([]);
  const [listOfModels, setListOfModels] = useState<ProcedureProcessModel[]>([]);

  useEffect(() => {
    if (submitEvent) {
      // Step 1: Converting event into File list.
      const files = FileUtils.GetListOfUploadedFilesFromEvent(submitEvent);
      const fileList: File[] = [];
      const procedureProcessFiles: ProcedureProcessModel[] = [];
      for (const file of files) {
        if (file.type !== "text/xml") {
          procedureProcessFiles.push({
            file: file,
            message: ProcedureFileMessages.FileExtensionIsNotXml,
          });
        } else {
          fileList.push(file);
        }
      }
      setListOfFiles(fileList);
      setListOfModels(procedureProcessFiles);
    }
  }, [submitEvent]);

  useEffect(() => {
    if (listOfFiles.length > 0) {
      const file = listOfFiles[0];

      // Step 2: Converting files to buffers.
      FileUtils.FileToBuffer(file, (buffer) => {
        // Step 3: Parsing buffers to models.
        /*
         * TODO: If the parsing is unsuccessful, as the XML is differ from the sample,
         * throw an error, while displaying a sample XML file to the user, as what file
         * is the parser accepts.
         */
        try {
          const procedureModel = FileUtils.ParseBufferToModel(buffer);
          const requestModel: ProcedureResultRequest = {
            timestamp: ProcedureLogUtils.getCreatingDateOLog(
              procedureModel.annotation.date
            ),
            method: ProcedureLogUtils.getMethodNameByLog(
              procedureModel.annotation.method
            ),
            params: ProcedureLogUtils.getParamsByLog(
              procedureModel.annotation.method
            ),
            file: ProcedureLogUtils.getFileByLog(
              procedureModel.annotation.filename
            ),
            objects: ProcedureLogUtils.getObjectsByLog(
              procedureModel.annotation.object
            ),
          };

          // TODO: Send the new object to the backend for save.

          console.log("Result Model:", requestModel);
        } catch (error: any) {
          if (error instanceof ProcedureLogError) {
            // Error occurred during the parse of the XML file.
            setListOfModels((prev) => [
              ...prev,
              {
                file: file,
                message: error.message as ProcedureFileMessages,
              },
            ]);
          }
        } finally {
          setListOfFiles(listOfFiles.filter((_, index) => index !== 0));
        }
      });
    } else {
      setSubmitEvent(undefined);
    }
  }, [listOfFiles]);

  const displayDragAndDropComponent = () => {
    if (submitEvent) {
      return <React.Fragment></React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <UploadIcon width={100} height={100} fill="gray" />
          Drag & Drop fájlokat itt
        </React.Fragment>
      );
    }
  };

  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <StyledComponentGap display={"grid"}>
        <StyledBoxHolder>
          <StyledDragAndDropHolder>
            {displayDragAndDropComponent()}
          </StyledDragAndDropHolder>
          {!submitEvent ? (
            <VisuallyHiddenInput
              type="file"
              onChange={setSubmitEvent}
              accept={".xml"}
              multiple
            />
          ) : null}
        </StyledBoxHolder>
        <CustomStyledComponentGap gap={"8px"}>
          <Typography variant={"h6"} color={"gray"}>
            Támogatott fájl formátumok:
          </Typography>
          <Typography variant={"h6"} fontWeight={"bold"} color={"gray"}>
            XML
          </Typography>
        </CustomStyledComponentGap>
      </StyledComponentGap>

      <UploadFileAccordionCard listOfModels={listOfModels} />
      <UploadFileAccordionCard listOfModels={listOfModels} isErrorOnly />
    </StyledComponentGap>
  );
};

export default UploadProcedureScreen;

export const uploadProcedureCommonStyles = {
  margin: "0 10%",
};

const StyledDragAndDropHolder = styled("div")<{}>((props) => ({
  position: "absolute",
  display: "grid",
  gap: "8px",
  justifyItems: "center",
  fontSize: "x-large",
}));

const CustomStyledComponentGap = styled(StyledComponentGap)<{}>((props) => ({
  ...uploadProcedureCommonStyles,
}));

const VisuallyHiddenInput = styled("input")<{}>((props) => ({
  clip: "rect(0 0 0 0)",
  opacity: 0,
  height: 350,
  position: "relative",
  whiteSpace: "nowrap",
  width: "100%",
  cursor: "pointer",
}));

const StyledBoxHolder = styled("div")<{}>((props) => ({
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
