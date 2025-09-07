import i18n from "@i18n/i18nHandler";
import { MenuItemType } from "@model/types/MenuItemType";
import { setImageToFolderAdditionDialogOpen } from "@redux/actions/dialogActions";
import { setFolderCreationDialogToOpen } from "@redux/actions/folderCreationActions";
import { useDispatch } from "react-redux";

export const useImageToFolderAdditionConfig = (): MenuItemType[] => {
  const dispatch = useDispatch();

  return [
    {
      icon: <></>,
      menuTitle: i18n.t("screens.filtering.folder-menu-items.add-to-existing-folder"),
      isDisplayed: true,
      onClick: (): void => {
        dispatch(setImageToFolderAdditionDialogOpen(true));
      },
    },
    {
      icon: <></>,
      menuTitle: i18n.t("screens.filtering.folder-menu-items.add-to-empty-folder"),
      isDisplayed: true,
      onClick: (): void => {
        dispatch(setFolderCreationDialogToOpen(true));
      },
    },
  ];
};
