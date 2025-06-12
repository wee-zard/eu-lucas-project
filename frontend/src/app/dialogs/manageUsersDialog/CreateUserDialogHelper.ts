import { createUserCommand } from "@api/command/userCommands";
import { UserCreationFormBuilder } from "@helper/formBuilderHelper";
import { isFormValid, validateFormControlGroup } from "@helper/FormValidationHelper";
import { getGenericLocalStorageItem, setLocalStorageItem } from "@helper/localStorageUtil";
import { baseErrorResponseToErrorMessage } from "@helper/notificationUtil";
import getRandomIdentification from "@helper/randomGeneratorHelper";
import { LocalStorageKeys } from "@model/enum";
import { ServerErrorEnum } from "@model/enum/ServerErrorEnum";
import { BaseFormControlGroup } from "@model/forms/BaseFormControlGroup";
import { UserCreationFormControlGroup } from "@model/forms/UserCreationFormControlGroup";
import { UserCreationRequest } from "@model/request/UserCreationRequest";
import { BaseErrorResponse } from "@model/response/BaseErrorResponse";
import { InputFormControlEntry } from "@model/types/InputFormControlEntry";

const storageKey = LocalStorageKeys.UserCreationForm;

export const getCreateUserFormStorageItem = (): UserCreationFormControlGroup => {
  const res = getGenericLocalStorageItem<UserCreationFormControlGroup>(storageKey);

  if (!res || res.email.length === 0) {
    const group = UserCreationFormBuilder.buildGroup();
    const newFormGroup: UserCreationFormControlGroup = {
      email: group.email,
      role: res?.role ?? group.role,
    };
    setLocalStorageItem(newFormGroup, storageKey);
    return newFormGroup;
  }

  return res;
};

export const getCreateUserFormStorageItemById = (id: any): InputFormControlEntry | undefined => {
  const forms = getCreateUserFormStorageItem();
  return forms.email.find((form) => form.id === id);
};

export const validateCreateUserDialogForm = (): Promise<boolean> => {
  return new Promise((resolve, reject: (group: BaseFormControlGroup) => void) => {
    const modifiedForm = validateFormControlGroup<UserCreationFormControlGroup>(
      getCreateUserFormStorageItem(),
    );

    if (!isFormValid(modifiedForm)) {
      reject(modifiedForm);
      return;
    }

    const request: UserCreationRequest[] = [
      ...modifiedForm.email.map((email) => ({
        emailAddress: `${email.data}@gmail.com`,
        roleId: Number(modifiedForm.role.data),
      })),
    ];

    createUserCommand(request)
      .then(() => resolve(true))
      .catch((error) => {
        const baseError: BaseErrorResponse = JSON.parse(error);

        if (baseError.key === ServerErrorEnum.EMAIL_ADDRESS_IS_ALREADY_TAKEN) {
          const errorForm: UserCreationFormControlGroup = {
            ...modifiedForm,
            email: [
              ...modifiedForm.email.map((entry) =>
                `${entry.data}@gmail.com` === baseError.param0
                  ? {
                      ...entry,
                      id: getRandomIdentification(),
                      error: baseErrorResponseToErrorMessage(baseError, false),
                    }
                  : entry,
              ),
            ],
          };

          reject(errorForm);
          return;
        }

        reject(modifiedForm);
        return;
      });
  });
};
