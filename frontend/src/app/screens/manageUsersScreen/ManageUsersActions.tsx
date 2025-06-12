import StyledButton from "@components/StyledButton";
import CreateUserDialog from "@dialogs/manageUsersDialog/CreateUserDialog";
import i18n from "@i18n/i18nHandler";
import { useState } from "react";

const ManageUsersActions = () => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <StyledButton
        buttonText={i18n.t("screens.manage-users.create-new-user-button")}
        buttonVariant="outlined"
        onClick={() => setDialogOpen(true)}
      />
      <CreateUserDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default ManageUsersActions;
