import { StyledComponentGap } from "@global/globalStyles";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import UploadFileAccordionCard from "./UploadFileAccordionCard";
import i18n from "@i18n/i18nHandler";
import UploadProcedureActions from "./UploadProcedureActions";

const UploadProcedureScreen = () => {
  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <StyledComponentGap display={"grid"}>
        <UploadProcedureActions />
        <CustomStyledComponentGap gap={"8px"}>
          <Typography variant={"h6"} color={"gray"}>
            {i18n.t("screens.upload-procedures.view.supported-format")}
          </Typography>
          <Typography variant={"h6"} fontWeight={"bold"} color={"gray"}>
            {i18n.t("screens.upload-procedures.view.xml")}
          </Typography>
        </CustomStyledComponentGap>
      </StyledComponentGap>
      <UploadFileAccordionCard />
    </StyledComponentGap>
  );
};

export default UploadProcedureScreen;

const CustomStyledComponentGap = styled(StyledComponentGap)<{}>((_) => ({
  margin: "0 10%",
}));
