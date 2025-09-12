import StyledButton from "@components/StyledButton";
import { StyledDialog, StyledDialogTitle } from "@dialogs/filteringDialog/FilteringDialog";
import i18n from "@i18n/i18nHandler";
import { ButtonColorType } from "@model/types/ButtonColorType";
import { ButtonVariantType } from "@model/types/ButtonVariantType";
import { DialogConfigStyleType } from "@model/types/ConfirmationDialogConfigType";
import { DialogContent, styled } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

type CommonButtonType = {
  text?: string;
  variant?: ButtonVariantType;
  color?: ButtonColorType;
  width?: string;
  isHidden?: boolean;
};

type Props = {
  content: JSX.Element;
  isOpen: boolean;
  dialogTitle?: string;
  cancelButton?: CommonButtonType;
  submitButton?: CommonButtonType;
  height: string;
  width: string;
  styles?: DialogConfigStyleType;
  onClose: () => void;
  onSubmit: () => void;
};

const TemplateDialog = ({
  content,
  isOpen,
  dialogTitle,
  cancelButton = {},
  submitButton = {},
  height,
  width,
  styles,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <StyledDialog
      fullWidth
      $isHeightDynamic={styles?.isHeightDynamic}
      styledmaxheight={height ?? "85%"}
      styledmaxwidth={width ?? "32%"}
      open={isOpen}
      onClose={onClose}
    >
      {dialogTitle ? <StyledDialogTitle>{dialogTitle}</StyledDialogTitle> : null}
      <StyledDialogContent>{content}</StyledDialogContent>
      {!cancelButton?.isHidden ||
        (!submitButton?.isHidden && (
          <DialogActions>
            {!cancelButton?.isHidden && (
              <StyledButton
                buttonText={cancelButton.text ?? i18n.t("components.button.cancel")}
                buttonVariant={cancelButton.variant ?? "outlined"}
                buttonColor={cancelButton.color ?? "error"}
                applyStyle={{ buttonWidth: cancelButton.width }}
                onClick={onClose}
              />
            )}
            {!submitButton?.isHidden && (
              <StyledButton
                buttonText={submitButton.text ?? i18n.t("components.button.delete")}
                buttonVariant={submitButton.variant ?? "outlined"}
                buttonColor={submitButton.color ?? "success"}
                applyStyle={{ buttonWidth: submitButton.width }}
                onClick={onSubmit}
              />
            )}
          </DialogActions>
        ))}
    </StyledDialog>
  );
};

export default TemplateDialog;

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
