import StyledButton from "@components/StyledButton";
import { StyledDialog, StyledDialogTitle } from "@dialogs/filteringDialog/FilteringDialog";
import { ButtonColorType } from "@model/types/ButtonColorType";
import { ButtonVariantType } from "@model/types/ButtonVariantType";
import { DialogContent, styled } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

type Props = {
  content: JSX.Element;
  isOpen: boolean;
  dialogTitle?: string;
  cancelButton?: {
    text?: string;
    variant?: ButtonVariantType;
    color?: ButtonColorType;
    width?: string;
  };
  submitButton?: {
    text?: string;
    variant?: ButtonVariantType;
    color?: ButtonColorType;
    width?: string;
  };
  height: string;
  width: string;
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
  onClose,
  onSubmit,
}: Props) => {
  return (
    <StyledDialog
      fullWidth
      styledmaxheight={height ?? "85%"}
      styledmaxwidth={width ?? "32%"}
      open={isOpen}
      onClose={onClose}
    >
      {dialogTitle ? <StyledDialogTitle>{dialogTitle}</StyledDialogTitle> : null}
      <StyledDialogContent>{content}</StyledDialogContent>
      <DialogActions>
        <StyledButton
          buttonText={cancelButton.text ?? "Mégsem"}
          buttonVariant={cancelButton.variant ?? "outlined"}
          buttonColor={cancelButton.color ?? "error"}
          applyStyle={{ buttonWidth: cancelButton.width }}
          onClick={onClose}
        />
        <StyledButton
          buttonText={submitButton.text ?? "Törlés"}
          buttonVariant={submitButton.variant ?? "outlined"}
          buttonColor={submitButton.color ?? "success"}
          applyStyle={{ buttonWidth: submitButton.width }}
          onClick={onSubmit}
        />
      </DialogActions>
    </StyledDialog>
  );
};

export default TemplateDialog;

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
