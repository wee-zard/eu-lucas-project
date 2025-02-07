import { styled } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Typography,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactComponent as XmlIcon } from "@media/xml.svg";
import ProcedureProcessModel from "@model/ProcedureProcessModel";
import { StyledComponentGap } from "@global/globalStyles";
import { uploadProcedureCommonStyles } from "./UploadProcedureScreen";
import { ProcedureFileMessages } from "@model/enum";

type Props = {
  listOfModels: ProcedureProcessModel[];
  isErrorOnly?: boolean;
};

const UploadFileAccordionCard = ({ listOfModels, isErrorOnly }: Props) => {
  const isErrorPresent = (message?: ProcedureFileMessages) =>
    message && message !== ProcedureFileMessages.FileIsSuccessfullyUploaded;

  const listOfFilteredModels = listOfModels.filter((model) =>
    isErrorOnly ? isErrorPresent(model.message) : !isErrorPresent(model.message)
  );

  return (
    <StyledTransitionGroup unmountOnExit>
      {listOfFilteredModels.length > 0 ? (
        <StyledCollapse>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                {`${isErrorOnly ? "Sikertelenül" : "Sikeresen"} feltöltött fájlok`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StyledComponentGap display={"grid"}>
                {listOfFilteredModels.map((procedureModel, index) => (
                  <StyledFileHolder
                    $isError={isErrorPresent(procedureModel.message)}
                    key={index}
                  >
                    <div>
                      <XmlIcon width={100} height={100} />
                    </div>
                    <StyledRightFileHolder>
                      <div>{procedureModel.file.name}</div>
                      <StyledMessageHolder
                        $isError={isErrorPresent(procedureModel.message)}
                      >
                        {procedureModel.message}
                      </StyledMessageHolder>
                    </StyledRightFileHolder>
                  </StyledFileHolder>
                ))}
              </StyledComponentGap>
            </AccordionDetails>
          </Accordion>
        </StyledCollapse>
      ) : null}
    </StyledTransitionGroup>
  );
};

export default UploadFileAccordionCard;

const StyledCollapse = styled(Collapse)<{}>((_) => ({
  ...uploadProcedureCommonStyles,
}));

const StyledMessageHolder = styled("div")<{ $isError?: boolean }>((props) => ({
  color: `${props.$isError ? "red" : "green"}`,
  textShadow: "1px 1px 1px gray",
  fontSize: "x-large",
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
}));

const StyledTransitionGroup = styled(TransitionGroup)<{}>((_) => ({
  display: "grid",
  gap: "32px",
}));
