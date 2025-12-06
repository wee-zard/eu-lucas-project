import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { setBackgroundBackdropConfig } from "@redux/actions/backgroundActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { openSnackbar } from "@helper/notificationUtil";
import { SnackEnum } from "@model/enum/SnackEnum";
import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import ConfirmationDialog from "@dialogs/template/ConfirmationDialog";
import { selectProcedureLogSettingCell } from "@redux/selectors/procedureLogSelector";
import { LogSettingCellEnum } from "@model/enum/LogSettingCellEnum";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { deleteProcedureLogById } from "@api/command/procedureLogCommands";
import { setProcedureLogSettingCell } from "@redux/actions/procedureLogActions";

const ManageLogsBackgroundProcess = () => {
  const [isOpen, setOpen] = useState(false);
  const [isSubmitClicked, setSubmitClicked] = useState(false);
  const [isCancelClicked, setCancelClicked] = useState(false);
  const settingOptions = useSelector(selectProcedureLogSettingCell);
  const dispatch = useDispatch();

  const handleOnConfirmationDialogClose = () => {
    setCancelClicked(true);
  };

  const handleOnConfirmationDialogSubmit = () => {
    setSubmitClicked(true);
  };

  useEffect(() => {
    if (!settingOptions) {
      return;
    }

    const handler: GenericHandlerType<LogSettingCellEnum, (data: ProcedureLogDto) => void> = {
      /**
       * A process to delete the provided folder by their id.
       * Before the deletion, a confirmation dialog will be popup up,
       * where the users must confirm their actions.
       *
       * @param folderId The id of the folder to delete.
       */
      [LogSettingCellEnum.DELETE]: (data: ProcedureLogDto) => {
        handleConfirmationDialogBranching(() => {
          dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));
          deleteProcedureLogById(data.id)
            .then(() => openSnackbar(SnackEnum.FOLDER_IS_DELETED))
            .finally(() => {
              dispatch(setBackgroundBackdropConfig({ isBackdropOpen: false }));
              // Reset the paginated table on the Manage Folders page.
              EventListenerUtil.dispatchEvent(EventListenerIdEnum.PAGINATED_TABLE);
              handleConfirmationDialogReset();
              dispatch(setProcedureLogSettingCell(undefined));
            });
        });
      },
    };

    // Processing the setting option what was clicked by the user.
    handler[settingOptions.option](settingOptions.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingOptions, isOpen, isSubmitClicked, isCancelClicked, dispatch]);

  /**
   * The setting has been processed, so we reset it to the default value.
   */
  const handleSettingOptionReset = () => {
    dispatch(setProcedureLogSettingCell(undefined));
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

export default ManageLogsBackgroundProcess;
