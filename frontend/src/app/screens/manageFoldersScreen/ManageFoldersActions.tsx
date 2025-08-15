import StyledButton from "@components/StyledButton";
import i18n from "@i18n/i18nHandler";
import { setFolderCreationDialogToOpen } from "@redux/actions/folderCreationActions";
import { useDispatch } from "react-redux";

const ManageFoldersActions = () => {
  const dispatch = useDispatch();

  const handleClickOnNewFolderButton = () => {
    dispatch(setFolderCreationDialogToOpen(true));
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
