import { BaseFormControlGroup } from "@model/forms/BaseFormControlGroup";
import { isFormValid, validateFormControlGroup } from "./FormValidationHelper";
import { FormEnums } from "@model/enum";
import { buildGenericFormGroup } from "./formBuilderHelper";
import { getGenericLocalStorageItem, setLocalStorageItem } from "./localStorageUtil";
import EventListenerUtil from "./eventListenerUtil";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";

export class FormGroupHelper<T extends BaseFormControlGroup> {
  constructor(
    /**
     * Based on the provided local storage cache key, retrieves the corresponding form group.
     */
    public cacheKey: FormEnums,
    public refreshKey?: EventListenerIdEnum,
  ) {}

  public getCacheKey = () => {
    return this.cacheKey;
  };

  public getRefreshKey = () => {
    return this.refreshKey;
  };

  /**
   * Constructs a new form group based on the provided cache key.
   */
  public construct = (): T => {
    const formGroup = buildGenericFormGroup<T>(this.cacheKey);
    this.saveInLocalStorage(formGroup);
    return formGroup;
  };

  /**
   * Retrieves the form group from the local storage.
   * If the group is not found there, then create a new form groups.
   *
   * @returns Returns a form control group from the local storage.
   */
  public get = (): T => {
    const res = getGenericLocalStorageItem<T>(this.cacheKey);

    if (!res) {
      const group = this.construct();
      return group;
    }

    return res;
  };

  /**
   * Saves a form group property with a new value.
   *
   * @param formGroup The form group to update.
   * @param newValue The new value for one of the property of the form group.
   * @param propertyToUpdate One of the property of the form group.
   * @param propertyId A unique id to find the corresponding {@link InputFormControlEntry} from the form group.
   * @returns Returns the updates form group.
   */
  public save = (
    formGroup: T,
    newValue: string,
    propertyToUpdate: keyof T,
    propertyId?: number | string,
  ): T => {
    if (Array.isArray(formGroup[propertyToUpdate])) {
      formGroup = {
        ...formGroup,
      };
      // TODO: ...
    } else {
      formGroup = {
        ...formGroup,
        [propertyToUpdate]: {
          ...formGroup[propertyToUpdate],
          data: newValue,
          error: undefined,
        },
      };
    }

    this.saveInLocalStorage(formGroup);
    this.refresh();
    return formGroup;
  };

  /**
   * Validates a provided form group.
   * If the form is valid, then the method will return undefined, else it will return
   * the T typed form group that will contain error messages.
   */
  public validate = (formGroup: T): T | undefined => {
    const errorCandidateFormGroup = validateFormControlGroup<T>(formGroup);

    if (isFormValid(errorCandidateFormGroup)) {
      return;
    }

    return errorCandidateFormGroup;
  };

  /**
   * Converts the provided form group into a model where the form related
   * types are not longer present, only primitive types.
   *
   * @param formGroup
   * @returns
   */
  public convert = <K>(formGroup: any): K => {
    const formGroupKeys = Object.keys(formGroup);
    return formGroupKeys
      .map((key) => ({
        [key]: Array.isArray(formGroup[key])
          ? "" // TODO: ...
          : formGroup[key].data,
      }))
      .reduce((acc, obj) => ({ ...acc, ...obj }), {}) as K;
  };

  /**
   * Refreshes the page.
   *
   * @param overrideRefreshKey Overrides the default refreshKey with this value.
   */
  public refresh = (overrideRefreshKey?: EventListenerIdEnum): void => {
    if (!this.refreshKey) {
      return;
    }

    EventListenerUtil.dispatchEvent(overrideRefreshKey ?? this.refreshKey);
  };

  /**
   * Clear out an entry from the local storage.
   */
  public remove = (): void => {
    localStorage.removeItem(this.cacheKey);
  };

  /**
   * Saves the provide form group in the local storage.
   *
   * @param formGroup
   */
  private saveInLocalStorage = (formGroup: T): void => {
    setLocalStorageItem(formGroup, this.cacheKey);
  };
}
