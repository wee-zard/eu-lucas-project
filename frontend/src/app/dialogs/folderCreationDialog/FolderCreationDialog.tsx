import TemplateDialog from "@dialogs/template/TemplateDialog";
import { setFolderCreationDialogOpen } from "@redux/actions/dialogActions";
import { selectIsFolderCreationDialogOpen } from "@redux/selectors/dialogSelector";
import { useSelector, useDispatch } from "react-redux";
import FolderCreationContent from "./FolderCreationContent";
import { useEffect } from "react";
import { LocalStorageKeys } from "@model/enum";
import { removeLocalStorageItem } from "@helper/localStorageUtil";
import FolderCreationDialogHelper from "./FolderCreationDialogHelper";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
import { throwNotification, ToastSeverity } from "@helper/notificationUtil";

const FolderCreationDialog = () => {
  const isOpen = useSelector(selectIsFolderCreationDialogOpen);
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  const dispatch = useDispatch();

  useEffect(() => {
    // Empty out the local storage entry.
    removeLocalStorageItem(LocalStorageKeys.FolderCreationForm);
  }, [isOpen]);

  return (
    <TemplateDialog
      content={<FolderCreationContent />}
      isOpen={isOpen}
      dialogTitle={"Kiválasztott képek mentése új mappába"}
      cancelButton={{ text: "Mégsem", width: "120px" }}
      submitButton={{ text: "Létrehozás", width: "120px" }}
      height={"65%"}
      width={"65%"}
      onClose={() => dispatch(setFolderCreationDialogOpen(false))}
      onSubmit={() => {
        dispatch(setSettingBackdropOpen(true));

        FolderCreationDialogHelper.validate(listOfSelectedImages)
          .then(() => {
            throwNotification(ToastSeverity.Success, "Mappa sikeresen létrehozásra került!");
            FolderCreationDialogHelper.refresh();
            dispatch(setFolderCreationDialogOpen(false));
          })
          .catch(() => FolderCreationDialogHelper.refresh())
          .finally(() => dispatch(setSettingBackdropOpen(false)));
      }}
    />
  );
};

export default FolderCreationDialog;
