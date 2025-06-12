import StyledIconButton from "@components/StyledIconButton";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import EventListenerUtil from "@helper/eventListenerUtil";
import { setLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { styled } from "@mui/material/styles";
import { memo, useState } from "react";
import {
  getCreateUserFormStorageItem,
  getCreateUserFormStorageItemById,
} from "./CreateUserDialogHelper";
import { UserCreationFormControlGroup } from "@model/forms/UserCreationFormControlGroup";

type Props = {
  id: string | number;
};

const CreateUserDialogFormEntry = memo(function FilteringQueryBuilder({ id }: Props) {
  const [formEntry, setFormEntry] = useState(getCreateUserFormStorageItemById(id));

  /**
   * Updates one of the {@link InputFormControlEntry}'s data property by the param.
   *
   * @param value The value what the user provided on the form.
   */
  const updateForm = (value: string): void => {
    const item = getCreateUserFormStorageItem();
    const newFormControlGroup: UserCreationFormControlGroup = {
      email: item.email.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              data: value,
              error: undefined,
            }
          : entry,
      ),
      role: item.role,
    };

    setLocalStorageItem(newFormControlGroup, LocalStorageKeys.UserCreationForm);
    setFormEntry(getCreateUserFormStorageItemById(id));
  };

  /**
   * Removes a form entry from the list.
   *
   * @param id The id of the form entry to remove from the list of forms.
   */
  const removeFormEntry = (id: number | string) => {
    const item = getCreateUserFormStorageItem();
    const newFormControlGroup: UserCreationFormControlGroup = {
      email: [...item.email.filter((entry) => entry.id !== id)],
      role: item.role,
    };
    setLocalStorageItem(newFormControlGroup, LocalStorageKeys.UserCreationForm);
    EventListenerUtil.dispatchEvent(EventListenerIdEnum.CREATE_USER_DIALOG);
  };

  const renderComponent = () => {
    if (!formEntry) {
      return null;
    }

    return (
      <div className="flex-container">
        <StyledTextFieldComponent
          inputTitle={"gmail cím"}
          inputValue={formEntry.data ?? ""}
          setValue={updateForm}
          inputAdornment={{ position: "end", icon: <>@gmail.com</> }}
          htmlInputValidation={{ ...formEntry.validators }}
          helperText={`Max karakterek száma: ${formEntry?.data?.length ?? 0}/64`}
          errorMessage={formEntry.error}
        />
        <div className="grid-container">
          <StyledIconButton
            buttonColor="error"
            buttonIcon={<DeleteForeverOutlinedIcon />}
            onClick={() => removeFormEntry(formEntry.id)}
          />
          <StyledPlaceholderBox />
        </div>
      </div>
    );
  };

  return renderComponent();
});

export default CreateUserDialogFormEntry;

const StyledPlaceholderBox = styled("div")({
  height: 15,
  minHeight: 15,
});
