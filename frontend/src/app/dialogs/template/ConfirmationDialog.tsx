import TemplateDialog from "@dialogs/template/TemplateDialog";
import i18n from "@i18n/i18nHandler";
import { ConfirmationDialogConfigType } from "@model/types/ConfirmationDialogConfigType";

type Props = {
  isOpen: boolean;
  config?: ConfirmationDialogConfigType;
  handleOnClose: () => void;
  handleOnSubmit: () => void;
};

const ConfirmationDialog = ({ isOpen, config, handleOnClose, handleOnSubmit }: Props) => {
  return (
    <TemplateDialog
      content={
        <div className="grid-gap24">
          {Number(config?.content?.length) > 0 ? (
            config?.content?.map((paragraph, index) => <div key={index}>{paragraph}</div>)
          ) : (
            <div>{i18n.t("components.dialog.confirmationContent")}</div>
          )}
        </div>
      }
      isOpen={isOpen}
      dialogTitle={config?.title ?? i18n.t("components.dialog.confirmationTitle")}
      cancelButton={{
        text: config?.cancelButton?.name ?? i18n.t("components.button.no"),
        color: config?.cancelButton?.color ?? "error",
        width: "120px",
      }}
      submitButton={{
        text: config?.submitButton?.name ?? i18n.t("components.button.yes"),
        color: config?.submitButton?.color ?? "success",
        width: "120px",
      }}
      height={"30%"}
      width={"65%"}
      styles={config?.styles}
      onClose={handleOnClose}
      onSubmit={handleOnSubmit}
    />
  );
};

export default ConfirmationDialog;
