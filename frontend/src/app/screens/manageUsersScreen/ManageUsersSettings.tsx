import StyledIconButton from "@components/StyledIconButton";
import { ManageUserRowTypes } from "@model/types/ManageUserRowType";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CachedIcon from "@mui/icons-material/Cached";
import { selectAuthenticatedUser } from "@redux/selectors/userSelector";
import { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material";
import {
  deleteUserById,
  getUsersCommand,
  reactivateDeletedUserByIdCommand,
} from "@api/command/userCommands";
import { throwNotification, ToastSeverity } from "@helper/notificationUtil";
import { useDispatch } from "react-redux";
import { setListOfUsers } from "@redux/actions/userActions";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import TemplateDialog from "@dialogs/template/TemplateDialog";
import { UserStatusEnum } from "@model/enum/UserStatusEnum";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { UserRoleEnum } from "@model/enum/UserRoleEnum";
import { MenuItemType } from "@model/types/MenuItemType";

type Props = {
  row: ManageUserRowTypes;
};

const ManageUsersSettings = ({ row }: Props) => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const isEditingOwnProfile = row.id === authenticatedUser?.userId;
  const isSettingsDisabled =
    isEditingOwnProfile || authenticatedUser?.roleId === UserRoleEnum.STUDENT;
  const templateDialogContentHandler: GenericHandlerType<UserStatusEnum, JSX.Element> = {
    [UserStatusEnum.PENDING]: (
      <div className="grid-align-to-center grid-gap24">
        <div>
          Biztosan <strong>törölni</strong> szeretnéd ezen fiókot?
        </div>
        <div>
          A törlést követően a felhasználó fiókja véglegesen törlésre kerül, és a hozzá tartozó
          minden adat ugyancsak törlésre került. Ezen opció csak a <strong>"pending"</strong>{" "}
          státusszal rendelkező felhasználók számára elérhető!
        </div>
      </div>
    ),
    [UserStatusEnum.ACTIVATED]: (
      <div className="grid-align-to-center grid-gap24">
        <div>
          Biztosan <strong>deaktiválni</strong> szeretnéd ezen fiókot?
        </div>
        <div>
          A deaktiválást követően a felhasználónak már nem lesz jogosultsága az alkalmazás
          használatához, de az általa felvett és rögzített adatok továbbra is elérhetőek lesznek a
          rendszerben! Ezen opció csak az <strong>"aktivált"</strong> státusszal rendelkező
          felhasználók számára elérhető.
        </div>
      </div>
    ),
    [UserStatusEnum.DELETED]: (
      <div className="grid-align-to-center grid-gap24">
        <div>
          Biztosan <strong>aktiválni</strong> szeretnéd ezen fiókot?
        </div>
        <div>
          A műveletet követően a fiók <strong>"aktivált"</strong> státuszba fog kerülni, aminek
          segítségével az adott felhasználó képes lesz bejelentkezni az alkalmazásba és hozzáférni
          annak tartalmaihoz.
        </div>
      </div>
    ),
    [UserStatusEnum.BLOCKED]: <></>,
  };

  const menuItemOptions: MenuItemType[] = [
    {
      icon: <EditOutlinedIcon />,
      menuTitle: "Jogosultság módosítása (TODO)",
      isDisabled: true,
      isDisplayed: true,
      onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
        // TODO: Implement the sub-menu so the users could change each others role.
        setAnchorEl2(event.currentTarget);
        handleClose();
      },
    },
    {
      color: "red",
      icon: <DeleteForeverOutlinedIcon />,
      menuTitle:
        row.statusId === UserStatusEnum.PENDING
          ? "Felhasználó törlése"
          : "Felhasználó deaktiválása",
      isDisabled: !authenticatedUser || row.roleId <= authenticatedUser?.roleId,
      isDisplayed: ![UserStatusEnum.BLOCKED, UserStatusEnum.DELETED].includes(row.statusId),
      onClick: () => setDialogOpen(true),
    },
    {
      color: "green",
      icon: <CachedIcon />,
      menuTitle: "Felhasználó aktiválása",
      isDisabled: !authenticatedUser || row.roleId <= authenticatedUser?.roleId,
      isDisplayed: row.statusId === UserStatusEnum.DELETED,
      onClick: () => setDialogOpen(true),
    },
  ];

  /**
   * Handle the deletion of the selected user.
   */
  const handleUserDeletion = (): void => {
    dispatch(setSettingBackdropOpen(true));
    const isPending = row.statusId === UserStatusEnum.PENDING;
    const message = `Felhasználó sikeresen ${isPending ? "törlésre" : "deaktiválásra"} került!`;

    // delete the user
    deleteUserById(row.id)
      .then(() => updateUserListOnManageUsers(message))
      .catch(() => dispatch(setSettingBackdropOpen(false)));
  };

  const handleUserReactivation = (): void => {
    dispatch(setSettingBackdropOpen(true));
    const message = "Felhasználó sikeresen aktiválásra került!";

    // reactivate user.
    reactivateDeletedUserByIdCommand(row.id)
      .then(() => updateUserListOnManageUsers(message))
      .catch(() => dispatch(setSettingBackdropOpen(false)));
  };

  const updateUserListOnManageUsers = (message: string) => {
    throwNotification(ToastSeverity.Success, message);
    getUsersCommand()
      .then((users) => {
        // close the menu
        closeDialog();
        dispatch(setListOfUsers(users));
        dispatch(setSettingBackdropOpen(false));
      })
      .catch(() => dispatch(setSettingBackdropOpen(false)));
  };

  const closeDialog = () => {
    setDialogOpen(false);
    handleClose();
  };

  return (
    <div id={`vertical-settings-${row.id}`} className="flex-container">
      <StyledIconButton
        buttonIcon={<MoreVertIcon />}
        onClick={handleClick}
        isDisabled={isSettingsDisabled}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItemOptions.map((option) =>
          option.isDisplayed ? (
            <MenuItem key={option.menuTitle} onClick={option.onClick} disabled={option.isDisabled}>
              <StyledMenuItemHolder className="flex-container" holder_color={option.color}>
                {option.icon}
                <div>{option.menuTitle}</div>
              </StyledMenuItemHolder>
            </MenuItem>
          ) : null,
        )}
      </Menu>
      <TemplateDialog
        content={templateDialogContentHandler[row.statusId]}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSubmit={() =>
          row.statusId === UserStatusEnum.DELETED ? handleUserReactivation() : handleUserDeletion()
        }
        cancelButton={{ text: "Nem", width: "120px" }}
        submitButton={{ text: "Igen", width: "120px" }}
        height={"35%"}
        width={"65%"}
      />
    </div>
  );
};

export default ManageUsersSettings;

const StyledMenuItemHolder = styled("div")<{ holder_color?: string }>((props) => ({
  color: props.holder_color,
}));
