import { StyledComponentGap } from "@global/globalStyles";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import UploadFileAccordionCard from "./UploadFileAccordionCard";
import { deleteProceduresCommand } from "@api/command/procedureCommands";
import i18n from "@i18n/i18nHandler";
import StyledButton from "@components/StyledButton";
import { deletePlantNameCommand } from "@api/command/plantNameCommands";
import { openSnackbar, throwNotification, ToastSeverity } from "@helper/notificationUtil";
import UploadProcedureActions from "./UploadProcedureActions";
import { SnackEnum } from "@model/enum/SnackEnum";
import { useDispatch } from "react-redux";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { setProcedureUploadProcessModels } from "@redux/actions/procedureUploadActions";

const UploadProcedureScreen = () => {
  const dispatch = useDispatch();

  const handleDeleteAllProcedureAndPlantButton = async () => {
    dispatch(setSettingBackdropOpen(true));
    try {
      await deleteProceduresCommand();
      await deletePlantNameCommand();
      openSnackbar(SnackEnum.LOGS_ARE_DELETED);
    } catch (error: any) {
      throwNotification(ToastSeverity.Error, error?.message);
    } finally {
      dispatch(setSettingBackdropOpen(false));
      dispatch(setProcedureUploadProcessModels([]));
    }
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

const CustomStyledComponentGap = styled(StyledComponentGap)<{}>((_) => ({
  margin: "0 10%",
}));
