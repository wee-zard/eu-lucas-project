import {
  setFolderSelectionFolderId,
  setFolderSelectionMenuAction,
  setFolderSelectionResponse,
  setFolderSelectionToOpen,
} from "@redux/actions/folderSelectionActions";
import { selectFolderSelectionStorage } from "@redux/selectors/folderSelectionSelectors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FolderSelectionTableCard from "./FolderSelectionTableCard";
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogContentHolder,
  StyledDialogTitle,
} from "@dialogs/filteringDialog/FilteringDialog";
import i18n from "@i18n/i18nHandler";
import { removeLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys, MenuActions } from "@model/enum";
import { useEffect } from "react";
import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";

const FolderSelectionDialog = () => {
  const { isOpen, folder } = useSelector(selectFolderSelectionStorage);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setFolderSelectionToOpen(false));
    dispatch(setFolderSelectionFolderId(undefined));
    dispatch(setFolderSelectionResponse(undefined));
    dispatch(setFolderSelectionMenuAction(undefined));
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    dispatch(setFolderSelectionMenuAction(MenuActions.PAGINATION_CHANGE));

    return () => {
      // Clearing out the local storage entry.
      removeLocalStorageItem(LocalStorageKeys.HideBoundingBoxesInsideFolder);

      // When the component itself is destroyed, then we are updating the paginated table.
      EventListenerUtil.dispatchEvent(EventListenerIdEnum.PAGINATED_TABLE);
    };
  }, [isOpen, dispatch]);

  return (
    <StyledDialog open={isOpen} onClose={handleDialogClose}>
      <StyledDialogTitle>{`[${i18n.t("screens.folders.folderSelection.folder")}]: ${folder?.title}`}</StyledDialogTitle>
      <StyledDialogContent>
        <StyledDialogContentHolder display={"grid"}>
          <FolderSelectionTableCard />
        </StyledDialogContentHolder>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default FolderSelectionDialog;
