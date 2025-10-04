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
    public readonly cacheKey: FormEnums,
    public readonly refreshKey?: EventListenerIdEnum,
  ) {}

  /**
   * Fetch the unique cache key of the helper. This key is a key of the localStorage.
   *
   * @returns Returns the cacheKey of the helper.
   */
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
   * Saves multiple form group properties and their new values at the same time,
   * and once the save is finished, refreshes the page, and returns the updated form group.
   *
   * @param formGroup The form group to update.
   * @param newValue The new value for one of the property of the form group.
   * @param propertyToUpdate One of the property of the form group.
   * @param propertyId A unique id to find the corresponding {@link InputFormControlEntry} from the form group.
   * @returns Returns the updates form group.
   */
  public saveAll = (
    element: {
      newValue: string;
      propertyToUpdate: keyof T;
    }[],
  ): T => {
    element.forEach((item) => this.handleSave(item.newValue, item.propertyToUpdate));

    this.refresh();
    return this.get();
  };

  /**
   * Saves a form group property with a new value. Once the save is finished,
   * refreshes the page.
   *
   * @param newValue The new value for one of the property of the form group.
   * @param propertyToUpdate One of the property of the form group.
   * @param eventListenerId
   * @param errorValue The value of the error of the corresponding form group entry.
   * @returns Returns the updates form group.
   */
  public save = (
    newValue: string,
    propertyToUpdate: keyof T,
    eventListenerId?: number | string,
    errorValue?: string,
  ): T => {
    const updatedFormGroup = this.handleSave(newValue, propertyToUpdate, errorValue);
    this.refresh(undefined, eventListenerId);
    return updatedFormGroup;
  };

  /**
   * Saves a new error message. Once the save is finished, refreshes the page.
   *
   * @param propertyToUpdate One of the property of the form group.
   * @param eventListenerId
   * @param errorValue The value of the error of the corresponding form group entry.
   * @returns Returns the updates form group.
   */
  public saveError = (
    propertyToUpdate: keyof T,
    eventListenerId?: number | string,
    errorValue?: string,
  ): T => {
    const currentValueOfProperty = (this.get()[propertyToUpdate] as any).data;
    const updatedFormGroup = this.handleSave(
      `${currentValueOfProperty}`,
      propertyToUpdate,
      errorValue,
    );
    this.refresh(undefined, eventListenerId);
    return updatedFormGroup;
  };

  /**
   * Saves a form group property with a new value. Once the save is finished,
   * refreshes the page.
   *
   * @param newValue The new value for one of the property of the form group.
   * @param propertyToUpdate One of the property of the form group.
   * @param errorValue The value of the error of the corresponding form group entry.
   * @returns Returns the updates form group.
   */
  private handleSave = (newValue: string, propertyToUpdate: keyof T, errorValue?: string) => {
    let formGroup = this.get();

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
          error: errorValue,
        },
      };
    }

    this.saveInLocalStorage(formGroup);
    return formGroup;
  };

  /**
   * Validates a provided form group.
   * If the form is valid, then the method will return undefined, else it will return
   * the T typed form group that will contain error messages.
   */
  private validate = (): T | undefined => {
    const errorCandidateFormGroup = validateFormControlGroup<T>(this.get());

    if (isFormValid(errorCandidateFormGroup)) {
      return;
    }

    return errorCandidateFormGroup;
  };

  /**
   * Validates a provided form group.
   */
  public isValid = (): boolean => {
    const errorCandidate = this.validate();

    if (!errorCandidate) {
      return true;
    }

    this.saveInLocalStorage(errorCandidate);
    this.refresh();
    return false;
  };

  /**
   * Converts the provided form group into a model where the form related
   * types are not longer present, only primitive types.
   *
   * @param formGroup
   * @returns
   */
  public convert = <K>(): K => {
    const formGroup = this.get();

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
  public refresh = (overrideRefreshKey?: EventListenerIdEnum, id?: string | number): void => {
    if (!this.refreshKey) {
      return;
    }

    EventListenerUtil.dispatchEvent(overrideRefreshKey ?? this.refreshKey, id);
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
