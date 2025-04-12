import { StyledComponentGap } from "@global/globalStyles";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import UploadFileAccordionCard from "./UploadFileAccordionCard";
import { deleteProceduresCommand } from "@api/command/procedureCommands";
import i18n from "@i18n/i18nHandler";
import StyledButton from "@components/StyledButton";
import { deletePlantNameCommand } from "@api/command/plantNameCommands";
import { NotificationSeverity, throwNotification } from "@helper/notificationUtil";
import UploadProcedureActions from "./UploadProcedureActions";

const UploadProcedureScreen = () => {
  const handleDeleteAllProcedureAndPlantButton = async () => {
    await deleteProceduresCommand();
    await deletePlantNameCommand();

    throwNotification(
      NotificationSeverity.Success,
      i18n.t("screens.upload-procedures.notifications.logs-are-deleted"),
    );
  };

  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <StyledButton
        buttonText={i18n.t("screens.upload-procedures.view.delete-uploaded-logs")}
        buttonColor="error"
        buttonVariant="outlined"
        onClick={handleDeleteAllProcedureAndPlantButton}
      />
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

export const uploadProcedureCommonStyles = {
  margin: "0 10%",
};

const CustomStyledComponentGap = styled(StyledComponentGap)<{}>((_) => ({
  ...uploadProcedureCommonStyles,
}));
