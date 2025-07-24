import StyledMenuComponent from "@components/StyledMenuComponent";
import i18n from "@i18n/i18nHandler";
import { FilteringScreenTexts } from "@model/enum";
import { MenuItemType } from "@model/types/MenuItemType";
import {
  setFolderCreationDialogOpen,
  setImageToFolderAdditionDialogOpen,
} from "@redux/actions/dialogActions";
import { useDispatch } from "react-redux";

type Props = {
  isDisabled: boolean;
};

const FilteringAddToFolderMenu = ({ isDisabled }: Props) => {
  const dispatch = useDispatch();

  const menuItemOptions: MenuItemType[] = [
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
        dispatch(setFolderCreationDialogOpen(true));
      },
    },
  ];

  return (
    <>
      <StyledMenuComponent
        options={menuItemOptions}
        tooltipTitle={FilteringScreenTexts.AddImagesToFolderTooltip}
        buttonText={FilteringScreenTexts.AddImagesToFolder}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default FilteringAddToFolderMenu;
