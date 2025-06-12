import { StyledDialog, StyledDialogTitle } from "@dialogs/filteringDialog/FilteringDialog";
import CreateUserDialogContent from "./CreateUserDialogContent";
import { useEffect } from "react";
import { DialogActions, styled } from "@mui/material";
import { LocalStorageKeys } from "@model/enum";
import { removeLocalStorageItem, setLocalStorageItem } from "@helper/localStorageUtil";
import { useDispatch } from "react-redux";
import StyledButton from "@components/StyledButton";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { validateCreateUserDialogForm } from "./CreateUserDialogHelper";
import { BaseFormControlGroup } from "@model/forms/BaseFormControlGroup";
import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { requestListOfUsers } from "@redux/actions/userActions";
import { throwNotification, ToastSeverity } from "@helper/notificationUtil";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateUserDialog = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Empty out the local storage entry.
    removeLocalStorageItem(LocalStorageKeys.UserCreationForm);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
  }, [isOpen]);

  return (
    <StyledCreateUserDialog
      fullWidth
      styledmaxheight={"85%"}
      styledmaxwidth={"32%"}
      open={isOpen}
      onClose={onClose}
    >
      <StyledDialogTitle>Új felhasználó létrehozása</StyledDialogTitle>
      <CreateUserDialogContent />
      <DialogActions>
        <StyledButton
          buttonText="Vissza"
          buttonVariant="outlined"
          buttonColor="error"
          onClick={onClose}
        />
        <StyledButton
          buttonText="Létrehozás"
          buttonVariant="outlined"
          buttonColor="success"
          onClick={() => {
            dispatch(setSettingBackdropOpen(true));
            validateCreateUserDialogForm()
              .then(() => {
                throwNotification(
                  ToastSeverity.Success,
                  "Felhasználók sikeresen létrehozásra kerültek!",
                );
                // Refreshes the list of users on the Manage Users page.
                requestListOfUsers(dispatch);
                onClose();
              })
              .catch((modifiedGroup: BaseFormControlGroup) => {
                setLocalStorageItem(modifiedGroup, LocalStorageKeys.UserCreationForm);
                EventListenerUtil.dispatchEvent(EventListenerIdEnum.CREATE_USER_DIALOG);
              })
              .finally(() => dispatch(setSettingBackdropOpen(false)));
          }}
        />
      </DialogActions>
    </StyledCreateUserDialog>
  );
};

export default CreateUserDialog;

const StyledCreateUserDialog = styled(StyledDialog)({
  "@media (max-width: 1350px)": {
    "& .MuiPaper-root": {
      maxHeight: "85%",
      maxWidth: "45%",
    },
  },
  "@media (max-width: 900px)": {
    "& .MuiPaper-root": {
      maxHeight: "85%",
      maxWidth: "65%",
    },
  },
  "@media (max-width: 750px)": {
    "& .MuiPaper-root": {
      maxHeight: "85%",
      maxWidth: "80%",
    },
  },
  "@media (max-width: 500px)": {
    "& .MuiPaper-root": {
      maxHeight: "90%",
      maxWidth: "90%",
    },
  },
});
