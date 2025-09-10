import { FolderSettingCellEnum } from "@model/enum/FolderSettingCellEnum";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { setBackgroundBackdropConfig } from "@redux/actions/backgroundActions";
import { selectSelectedFolderSettingCellOption } from "@redux/selectors/folderSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ZipHelper from "@helper/zipHelper";
import { setFolderSettingCellOption } from "@redux/actions/folderActions";
import { clearFolderCommand, deleteFolderCommand } from "@api/command/folderCommands";
import { openSnackbar, throwNotification, ToastSeverity } from "@helper/notificationUtil";
import { SnackEnum } from "@model/enum/SnackEnum";
import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import ConfirmationDialog from "@dialogs/template/ConfirmationDialog";
import { getGenericFormGroupHelper } from "@hooks/useFormGroup";
import { FormGroupHelperEnum } from "@model/enum/FormGroupHelperEnum";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import {
  setFolderCreationDialogEditingFolderId,
  setFolderCreationDialogToOpen,
} from "@redux/actions/folderCreationActions";

const ManageFoldersBackgroundProcess = () => {
  const [isOpen, setOpen] = useState(false);
  const [isSubmitClicked, setSubmitClicked] = useState(false);
  const [isCancelClicked, setCancelClicked] = useState(false);
  const folderSettingOption = useSelector(selectSelectedFolderSettingCellOption);
  const dispatch = useDispatch();

  const notImplementedYetMessage = () => {
    throwNotification(ToastSeverity.Info, "Még nem került implementálásra!");
  };

  const handleOnConfirmationDialogClose = () => {
    setCancelClicked(true);
  };

  const handleOnConfirmationDialogSubmit = () => {
    setSubmitClicked(true);
  };

  useEffect(() => {
    if (!folderSettingOption) {
      return;
    }

    const handler: GenericHandlerType<FolderSettingCellEnum, (folder: FolderDtoSlice) => void> = {
      [FolderSettingCellEnum.OPEN]: (_: FolderDtoSlice) => {
        notImplementedYetMessage();
      },
      [FolderSettingCellEnum.UPDATE]: (folder: FolderDtoSlice) => {
        getGenericFormGroupHelper(FormGroupHelperEnum.FOLDER_CREATION_FORM_GROUP).saveAll([
          { propertyToUpdate: "title", newValue: folder.title },
          { propertyToUpdate: "description", newValue: folder.description },
        ]);

        dispatch(setFolderCreationDialogToOpen(true));
        dispatch(setFolderCreationDialogEditingFolderId(folder.id));
      },
      [FolderSettingCellEnum.SHARE]: (_: FolderDtoSlice) => {
        notImplementedYetMessage();
      },
      [FolderSettingCellEnum.IMPORT]: (_: FolderDtoSlice) => {
        notImplementedYetMessage();
      },
      [FolderSettingCellEnum.COPY]: (_: FolderDtoSlice) => {
        notImplementedYetMessage();
      },
      [FolderSettingCellEnum.DOWNLOAD]: (_: FolderDtoSlice) => {
        dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));

        // TODO: Fetch the list of images here with a command (bounding boxes should be included)

        new ZipHelper(dispatch, {
          queryImages: [] /** TODO: Pass the folder's images here.  */,
        }).downloadZip();
      },

      // TODO: Confirmation dialog should be pop up before calling the actual api command.
      [FolderSettingCellEnum.LOCK]: (_: FolderDtoSlice) => {
        notImplementedYetMessage();
      },

      /**
       * A process to clear out the content inside the provided folder.
       * Before the procedure, a confirmation dialog will be popup up,
       * where the users must confirm their actions.
       *
       * @param folderId The id of the folder to clear out. In this case,
       * the folder will be not deleted, just the folder will be empty.
       */
      [FolderSettingCellEnum.CLEAR]: (folder: FolderDtoSlice) => {
        handleConfirmationDialogBranching(() => {
          dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));
          clearFolderCommand(folder.id)
            .then(() => openSnackbar(SnackEnum.FOLDER_IS_CLEARED))
            .finally(() => {
              // Reset the paginated table on the Manage Folders page.
              EventListenerUtil.dispatchEvent(EventListenerIdEnum.PAGINATED_TABLE);
              dispatch(setBackgroundBackdropConfig({ isBackdropOpen: false }));
              handleConfirmationDialogReset();
            });
        });
      },

      /**
       * A process to delete the provided folder by their id.
       * Before the deletion, a confirmation dialog will be popup up,
       * where the users must confirm their actions.
       *
       * @param folderId The id of the folder to delete.
       */
      [FolderSettingCellEnum.DELETE]: (folder: FolderDtoSlice) => {
        handleConfirmationDialogBranching(() => {
          dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));
          deleteFolderCommand(folder.id)
            .then(() => openSnackbar(SnackEnum.FOLDER_IS_DELETED))
            .finally(() => {
              // Reset the paginated table on the Manage Folders page.
              EventListenerUtil.dispatchEvent(EventListenerIdEnum.PAGINATED_TABLE);
              dispatch(setBackgroundBackdropConfig({ isBackdropOpen: false }));
              handleConfirmationDialogReset();
            });
        });
      },
    };

    // Processing the setting option what was clicked by the user.
    handler[folderSettingOption.option](folderSettingOption.folder);
  }, [folderSettingOption, isOpen, isSubmitClicked, isCancelClicked, dispatch]);

  /**
   * The setting has been processed, so we reset it to the default value.
   */
  const handleSettingOptionReset = () => {
    dispatch(setFolderSettingCellOption(undefined));
  };

  const handleConfirmationDialogReset = () => {
    setOpen(false);
    setSubmitClicked(false);
    setCancelClicked(false);
  };

  /**
   * If the confirmation dialog is needed, then it needs to be opened.
   * The application must await for the response from the dialog and do a condition checking.
   */
  const handleConfirmationDialogBranching = (handleSubmit: (obj?: any) => void) => {
    if (isSubmitClicked) {
      handleSettingOptionReset();
      handleSubmit();
      return;
    } else if (isCancelClicked) {
      handleSettingOptionReset();
      handleConfirmationDialogReset();
      return;
    }

    // Checks whether the confirmation dialog is open
    if (!isOpen) {
      setOpen(true);
    }
  };

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      handleOnClose={handleOnConfirmationDialogClose}
      handleOnSubmit={handleOnConfirmationDialogSubmit}
    />
  );
};

export default ManageFoldersBackgroundProcess;
