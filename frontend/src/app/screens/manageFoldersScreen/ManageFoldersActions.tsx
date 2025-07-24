import StyledButton from "@components/StyledButton";
import i18n from "@i18n/i18nHandler";
import { setFolderCreationDialogOpen } from "@redux/actions/dialogActions";
import { useDispatch } from "react-redux";

const ManageFoldersActions = () => {
  const dispatch = useDispatch();

  const handleClickOnNewFolderButton = () => {
    dispatch(setFolderCreationDialogOpen(true));
  };

  return (
    <>
      <StyledButton
        buttonText={i18n.t("screens.folders.creation-dialog.dialog-title.empty-folder")}
        buttonColor="primary"
        buttonVariant="outlined"
        onClick={handleClickOnNewFolderButton}
      />
    </>
  );
};

export default ManageFoldersActions;
