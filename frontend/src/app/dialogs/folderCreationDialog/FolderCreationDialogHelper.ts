import { FolderCreationFormBuilder } from "@helper/formBuilderHelper";
import { isFormValid, validateFormControlGroup } from "@helper/FormValidationHelper";
import { getGenericLocalStorageItem, setLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { FolderCreationFormGroup } from "@model/forms/FolderCreationFormGroup";
import FolderCreationRequest from "@model/request/FolderCreationRequest";
import SelectedImagesModel from "@model/SelectedImagesModel";
import { createNewFolderCommand } from "@api/command/folderCommands";
import EventListenerUtil from "@helper/eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";

export default abstract class FolderCreationDialogHelper {
  public static key = LocalStorageKeys.FolderCreationForm;
  public static IdKey = EventListenerIdEnum.FOLDER_CREATION_DIALOG;

  public static refresh = () => {
    EventListenerUtil.dispatchEvent(this.IdKey);
  };

  public static save = (group: FolderCreationFormGroup) => {
    setLocalStorageItem(group, this.key);
  };

  public static getStorageItem = (): FolderCreationFormGroup => {
    const res = getGenericLocalStorageItem<FolderCreationFormGroup>(this.key);

    if (!res) {
      const group = FolderCreationFormBuilder.buildGroup();
      setLocalStorageItem(group, this.key);
      return group;
    }

    return res;
  };

  public static validate = (listOfSelectedImages: SelectedImagesModel[]): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const group = validateFormControlGroup<FolderCreationFormGroup>(this.getStorageItem());

      if (!isFormValid(group)) {
        this.save(group);
        reject();
        return;
      }

      const request: FolderCreationRequest = {
        title: group.title.data,
        description: group.description.data,
        queriedImages: listOfSelectedImages.map((model) => ({
          imageIds: model.images.map((imageDtoProperties) => imageDtoProperties.image.id),
          query: model.query ?? null,
        })),
      };

      createNewFolderCommand(request)
        .then(() => resolve(true))
        .catch(() => reject());
    });
  };
}
