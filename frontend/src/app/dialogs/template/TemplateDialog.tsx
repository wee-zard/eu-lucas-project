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
  const cancelButtonKeys = Object.keys(cancelButton).length > 0;
  const submitButtonKeys = Object.keys(submitButton).length > 0;

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
      {cancelButtonKeys || submitButtonKeys ? (
        <DialogActions>
          {cancelButtonKeys && (
            <StyledButton
              buttonText={cancelButton.text ?? i18n.t("components.button.cancel")}
              buttonVariant={cancelButton.variant ?? "outlined"}
              buttonColor={cancelButton.color ?? "error"}
              applyStyle={{ buttonWidth: cancelButton.width }}
              onClick={onClose}
            />
          )}
          {submitButtonKeys && (
            <StyledButton
              buttonText={submitButton.text ?? i18n.t("components.button.delete")}
              buttonVariant={submitButton.variant ?? "outlined"}
              buttonColor={submitButton.color ?? "success"}
              applyStyle={{ buttonWidth: submitButton.width }}
              onClick={onSubmit}
            />
          )}
        </DialogActions>
      ) : null}
    </StyledDialog>
  );
};

export default TemplateDialog;

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
