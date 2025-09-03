import { ButtonColorType } from "./ButtonColorType";

export type ConfirmationDialogConfigType = {
  title?: string;
  content?: string[];
  cancelButton?: ConfirmationDialogConfigButtonType;
  submitButton?: ConfirmationDialogConfigButtonType;
  styles?: DialogConfigStyleType;
};

type ConfirmationDialogConfigButtonType = {
  name?: string;
  color?: ButtonColorType;
};

export type DialogConfigStyleType = {
  isHeightDynamic?: boolean;
};
