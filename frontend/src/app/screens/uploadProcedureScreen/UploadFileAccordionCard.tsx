import { styled } from "@mui/material/styles";
import { TransitionGroup } from "react-transition-group";
import { ReactComponent as XmlIcon } from "@media/xml.svg";
import ProcedureProcessModel from "@model/ProcedureProcessModel";
import { uploadProcedureCommonStyles } from "./UploadProcedureScreen";
import { ProcedureFileMessages } from "@model/enum";
import i18n from "@i18n/i18nHandler";
import { useSelector } from "react-redux";
import { selectListOfProcedureProcesses } from "@redux/selectors/procedureUploadSelectors";

const UploadFileAccordionCard = () => {
  const listOfModels = useSelector(selectListOfProcedureProcesses);

  const isErrorPresent = (message?: ProcedureFileMessages) => {
    return message && message !== ProcedureFileMessages.FileIsSuccessfullyUploaded;
  };

  const displayModelMessage = (model: ProcedureProcessModel) => {
    const translationParams = Object.keys(model.options ?? {}) ? model.options : undefined;
    return i18n.t(model.message ?? "", translationParams);
  };

  return (
    <StyledTransitionGroup>
      {listOfModels.map((model, index) => (
        <StyledFileHolder $isError={isErrorPresent(model.message)} key={index}>
          <div>
            <XmlIcon width={100} height={100} />
          </div>
          <StyledRightFileHolder>
            <div>{model.filename}</div>
            <StyledMessageHolder $isError={isErrorPresent(model.message)}>
              {displayModelMessage(model)}
            </StyledMessageHolder>
          </StyledRightFileHolder>
        </StyledFileHolder>
      ))}
    </StyledTransitionGroup>
  );
};

export default UploadFileAccordionCard;

const StyledMessageHolder = styled("div")<{ $isError?: boolean }>((props) => ({
  color: `${props.$isError ? "red" : "green"}`,
  fontSize: "large",
}));

const StyledRightFileHolder = styled("div")<{}>((_) => ({
  display: "grid",
  alignItems: "center",
  width: "100%",
}));

const StyledFileHolder = styled("div")<{ $isError?: boolean }>((props) => ({
  ...uploadProcedureCommonStyles,
  boxShadow: `0px 2px 6px ${props.$isError ? "rgba(255, 255, 255, 0.27)" : "rgba(0, 255, 0, 0.27)"}`,
  borderLeft: `3px solid ${props.$isError ? "red" : "green"}`,
  padding: 24,
  backgroundColor: `${props.$isError ? "rgba(255, 120, 120, 0.1)" : "rgba(120, 255, 136, 0.1)"}`,
  display: "flex",
  gap: 16,
  width: "80%",
}));

const StyledTransitionGroup = styled(TransitionGroup)<{}>((_) => ({
  display: "grid",
  gap: 32,
}));
