import { ConversionUtils } from "@helper/conversionUtils";
import { getGenericLocalStorageItem, setLocalStorageItem } from "@helper/localStorageUtil";
import { FilterDialogFilters, LocalStorageKeys } from "@model/enum";

const cacheKey = LocalStorageKeys.PersistentFilterOptions;

type FilteringLocalStorageType = {
  [k in keyof FilterDialogFilters]: string[];
};

const getEnumKeyFromEnumValue = (value: FilterDialogFilters) =>
  ConversionUtils.EnumValueToEnumKey(FilterDialogFilters, value) as keyof FilterDialogFilters;

export const getFilteringLocalStorageContentByValue = (value: FilterDialogFilters) => {
  const obj = getGenericLocalStorageItem<FilteringLocalStorageType>(cacheKey);
  const key = getEnumKeyFromEnumValue(value);

  if (!obj || !key) {
    return;
  }

  return obj[key];
};

export const setFilteringLocalStorageContentByValue = (
  value: FilterDialogFilters,
  payload: string[],
) => {
  const obj = getGenericLocalStorageItem<FilteringLocalStorageType>(cacheKey);
  const key = getEnumKeyFromEnumValue(value);

  if (!key) {
    return;
  }

  const newObj = {
    ...obj,
    [key]: payload,
  };
  setLocalStorageItem(newObj, cacheKey);
};
