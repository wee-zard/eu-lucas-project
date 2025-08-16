import { FolderSettingCellEnum } from "@model/enum/FolderSettingCellEnum";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { selectSelectedFolderSettingCellOption } from "@redux/selectors/folderSelector";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ZipHelper from "./helper/zipHelper";
import { setFolderSettingCellOption } from "@redux/actions/folderActions";
import { clearFolderCommand, deleteFolderCommand } from "@api/command/folderCommands";
import { openSnackbar } from "@helper/notificationUtil";
import { SnackEnum } from "@model/enum/SnackEnum";
import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";

const ManageFoldersBackgroundProcess = () => {
  const folderSettingOption = useSelector(selectSelectedFolderSettingCellOption);
  const dispatch = useDispatch();

  const handler: GenericHandlerType<FolderSettingCellEnum, (folderId: number) => void> = useMemo(
    () => ({
      [FolderSettingCellEnum.OPEN]: (_: number) => null,
      [FolderSettingCellEnum.UPDATE]: (_: number) => null,
      [FolderSettingCellEnum.SHARE]: (_: number) => null,
      [FolderSettingCellEnum.IMPORT]: (_: number) => null,
      [FolderSettingCellEnum.COPY]: (_: number) => null,
      [FolderSettingCellEnum.DOWNLOAD]: (_: number) => {
        dispatch(setSettingBackdropOpen(true));

        // TODO: Fetch the list of images here with a command (bounding boxes should be included)

        const zipHelper = new ZipHelper({
          queryImages: [] /** TODO: Pass the folder's images here.  */,
        });
        zipHelper.downloadZip().finally(() => dispatch(setSettingBackdropOpen(false)));
      },

      // TODO: Confirmation dialog should be pop up before calling the actual api command.
      [FolderSettingCellEnum.LOCK]: (_: number) => null,

      // TODO: Confirmation dialog should be pop up before calling the actual api command.
      [FolderSettingCellEnum.CLEAR]: (folderId: number) => {
        dispatch(setSettingBackdropOpen(true));
        clearFolderCommand(folderId)
          .then(() => openSnackbar(SnackEnum.FOLDER_IS_CLEARED))
          .finally(() => {
            // Reset the paginated table on the Manage Folders page.
            EventListenerUtil.dispatchEvent(EventListenerIdEnum.PAGINATED_TABLE);
            dispatch(setSettingBackdropOpen(false));
          });
      },

      // TODO: Confirmation dialog should be pop up before calling the actual api command.
      [FolderSettingCellEnum.DELETE]: (folderId: number) => {
        dispatch(setSettingBackdropOpen(true));
        deleteFolderCommand(folderId)
          .then(() => openSnackbar(SnackEnum.FOLDER_IS_DELETED))
          .finally(() => {
            // Reset the paginated table on the Manage Folders page.
            EventListenerUtil.dispatchEvent(EventListenerIdEnum.PAGINATED_TABLE);
            dispatch(setSettingBackdropOpen(false));
          });
      },
    }),
    [dispatch],
  );

  useEffect(() => {
    if (!folderSettingOption) {
      return;
    }

    handler[folderSettingOption.option](folderSettingOption.folderId);
    dispatch(setFolderSettingCellOption(undefined));
  }, [folderSettingOption, handler, dispatch]);

  return <></>;
};

export default ManageFoldersBackgroundProcess;
