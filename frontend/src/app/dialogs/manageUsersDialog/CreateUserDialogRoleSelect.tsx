import StyledSelectComponent from "@components/StyledSelectComponent";
import { memo, useEffect, useState } from "react";
import { getCreateUserFormStorageItem } from "./CreateUserDialogHelper";
import { InputFormControlEntry } from "@model/types/InputFormControlEntry";
import { UserCreationFormControlGroup } from "@model/forms/UserCreationFormControlGroup";
import { setLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { getRolesCommand } from "@api/command/roleCommands";
import RoleDto from "@model/dto/RoleDto";
import { validateEmailAddress } from "@api/command/userCommands";

type Props = {
  id: string | number;
};

const CreateUserDialogRoleSelect = memo(function FilteringQueryBuilder({ id }: Props) {
  const [_, setEntry] = useState<InputFormControlEntry>(getCreateUserFormStorageItem().role);
  const [listOfRoles, setListOfRoles] = useState<RoleDto[]>([]);

  useEffect(() => {
    getRolesCommand().then((roles) =>
      validateEmailAddress().then((authenticatedUser) =>
        setListOfRoles(roles.filter((role) => role.id >= authenticatedUser.roleId)),
      ),
    );
  }, []);

  const updateForm = (_: string, index: number): void => {
    const item = getCreateUserFormStorageItem();
    const newFormControlGroup: UserCreationFormControlGroup = {
      email: item.email,
      role: {
        ...item.role,
        data: String(listOfRoles[index].id) ?? "",
        error: undefined,
      },
    };

    setLocalStorageItem(newFormControlGroup, LocalStorageKeys.UserCreationForm);
    setEntry(newFormControlGroup.role);
  };

  const renderComponent = () => {
    const entry = getCreateUserFormStorageItem().role;
    return (
      <div key={id}>
        <div className="grid-container">
          <p>
            Add meg, hogy az imént felvett felhasználó milyen szerepkörrel rendelkezzen a
            létrehozást követően.
          </p>
        </div>
        <StyledSelectComponent
          inputTitle={"Szerepkör"}
          options={listOfRoles.map((role) => role.roleName)}
          inputValue={listOfRoles.find((role) => role.id === Number(entry.data))?.roleName ?? ""}
          errorMessage={entry.error ?? ""}
          setValue={updateForm}
        />
      </div>
    );
  };

  return renderComponent();
});

export default CreateUserDialogRoleSelect;
