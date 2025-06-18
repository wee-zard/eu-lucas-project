import StyledMenuComponent from "@components/StyledMenuComponent";
import { FilteringScreenTexts } from "@model/enum";
import { MenuItemType } from "@model/types/MenuItemType";
import { setFolderCreationDialogOpen } from "@redux/actions/dialogActions";
import { useDispatch } from "react-redux";

type Props = {
  isDisabled: boolean;
};

const FilteringAddToFolderMenu = ({ isDisabled }: Props) => {
  const dispatch = useDispatch();

  const menuItemOptions: MenuItemType[] = [
    {
      icon: <></>,
      menuTitle: "Hozzáadás egy már létező mappához",
      isDisplayed: true,
      onClick: (): void => {
        // TODO: handle open of dialog
        //handleClose();
      },
    },
    {
      icon: <></>,
      menuTitle: "Hozzáadás új mappához",
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
