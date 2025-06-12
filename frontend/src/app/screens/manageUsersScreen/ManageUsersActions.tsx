import StyledButton from "@components/StyledButton";
import CreateUserDialog from "@dialogs/manageUsersDialog/CreateUserDialog";
import i18n from "@i18n/i18nHandler";
import { selectAuthenticatedUser } from "@redux/selectors/userSelector";
import { useState } from "react";
import { useSelector } from "react-redux";

const ManageUsersActions = () => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <StyledButton
        buttonText={i18n.t("screens.manage-users.create-new-user-button")}
        buttonVariant="outlined"
        isDisabled={!authenticatedUser || authenticatedUser.roleId === 3}
        onClick={() => setDialogOpen(true)}
      />
      <CreateUserDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default ManageUsersActions;
