import StyledButton from "@components/StyledButton";
import { StyledScrollBarHolder } from "@global/globalStyles";
import { setLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Divider, styled } from "@mui/material";
import CreateUserDialogFormEntry from "./CreateUserDialogFormEntry";
import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { useEventListenerRender } from "@hooks/useEventListenerRender";
import { getCreateUserFormStorageItem } from "./CreateUserDialogHelper";
import { UserCreationFormControlGroup } from "@model/forms/UserCreationFormControlGroup";
import { UserCreationFormBuilder } from "@helper/formBuilderHelper";
import { StyledDialogContent } from "@dialogs/filteringDialog/FilteringDialog";
import CreateUserDialogRoleSelect from "./CreateUserDialogRoleSelect";

const CreateUserDialogContent = () => {
  /**
   * Appends a new form entry to the list of forms.
   * This way, a new textfield component could be displayed on the view.
   */
  const appendFormEntry = () => {
    const item: UserCreationFormControlGroup = getCreateUserFormStorageItem();
    const newFormControlGroup: UserCreationFormControlGroup = {
      email: [...item.email, UserCreationFormBuilder.buildEntry()],
      role: item.role,
    };

    // Set the new form in the local storage
    setLocalStorageItem(newFormControlGroup, LocalStorageKeys.UserCreationForm);
    EventListenerUtil.dispatchEvent(EventListenerIdEnum.CREATE_USER_DIALOG);
  };

  const renderComponent = (): JSX.Element => {
    const formGroup = getCreateUserFormStorageItem();

    return (
      <StyledDialogContent>
        <StyledInputHolder>
          <div className="grid-container">
            <p>
              Új felhasználó létrehozása esetén, csak a felhasználó <strong>gmail címét</strong>
              kell megadni. A <strong>@gmail.com</strong> kiíratása NEM szükséges! Pl.
              <strong>&apos;example@gmail.com&apos;</strong> esetén elegendő az{" "}
              <strong>&apos;example&apos;</strong>
              megadása!
            </p>
            <p>
              Az új felhasználó <strong>neve és profilképe</strong>, ezen felhasználó bejelentkezése
              után fog beállításra kerülni.
            </p>
          </div>
          <div className="grid-gap24">
            <div className="grid-gap24">
              {formGroup.email.map((formEntry) => (
                <CreateUserDialogFormEntry key={formEntry.id} id={formEntry.id} />
              ))}
            </div>
            <StyledButton
              buttonVariant="outlined"
              buttonText={"Új felhasználó hozzáadása"}
              buttonIcon={<AddCircleOutlineIcon />}
              onClick={appendFormEntry}
              applyStyle={{ buttonWidth: "100%" }}
            />
            <Divider />
            <CreateUserDialogRoleSelect id={formGroup.role.id} />
          </div>
        </StyledInputHolder>
      </StyledDialogContent>
    );
  };

  return useEventListenerRender(EventListenerIdEnum.CREATE_USER_DIALOG, renderComponent);
};

export default CreateUserDialogContent;

const StyledInputHolder = styled(StyledScrollBarHolder)({
  margin: 3,
  padding: 12,
  width: "100%",
  alignItems: "flex-start",
});
