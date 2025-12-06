import { Fragment, useEffect, useMemo, useState } from "react";
import { QueryComponent, QueryConditions } from "@model/QueryBuilderModel";
import { FilterFormTemplate } from "@model/FilterFormTemplate";
import { FilteringFormInputKeys } from "@model/enum";
import { useSelectedTabToFilterTemplate } from "@hooks/useConversionHooks";
import { StyledInputHolder } from "./FilteringMenu";
import StyledSelectComponent from "@components/StyledSelectComponent";
import { ConversionUtils } from "@helper/conversionUtils";
import { useSelector } from "react-redux";
import { selectListOfCreationCountry } from "@redux/selectors/creationCountrySelector";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { FilteringHelper } from "@helper/filteringHelper";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import StyledCircularProgressOverlay from "@components/progressbar/StyledCircularProgressOverlay";
import { getExifDataListByExifKey } from "@api/command/exifDataCommands";
import { selectExifCacheStorage, selectListOfExifKeys } from "@redux/selectors/exifKeySelector";
import { useDispatch } from "react-redux";
import { setExifCacheStorage } from "@redux/actions/exifKeyActions";

type Props = {
  component: QueryComponent;
  setComponent: (queryComponent: QueryComponent) => void;
};

const FilteringInputField = ({ component, setComponent }: Props) => {
  const listOfCreationCountries = useSelector(selectListOfCreationCountry);
  const exifCacheStorage = useSelector(selectExifCacheStorage);
  const listOfExifKeys = useSelector(selectListOfExifKeys);
  const filterFormTemplate = useSelectedTabToFilterTemplate(component?.selectedFilterTab);
  const [queryComponent, setQueryComponent] = useState<QueryComponent>(component);
  const [secondSelectInputOptions, setSecondSelectInputOptions] = useState<string[]>();
  const dispatch = useDispatch();

  const handler: GenericHandlerType<
    FilteringFormInputKeys,
    (qc: QueryComponent) => QueryComponent
  > = useMemo(
    () => ({
      [FilteringFormInputKeys.OperatorInput]: (qc: QueryComponent) => ({
        ...qc,
        errors: {
          ...qc.errors,
          operatorInput: "",
        },
      }),
      [FilteringFormInputKeys.SelectInput]: (qc: QueryComponent) => ({
        ...qc,
        errors: {
          ...qc.errors,
          selectInput: "",
        },
      }),
      [FilteringFormInputKeys.SecondSelectInput]: (qc: QueryComponent) => ({
        ...qc,
        errors: {
          ...qc.errors,
          secondSelectInput: "",
        },
      }),
    }),
    [],
  );

  useEffect(() => {
    let qc = component;

    if (Object.keys(qc.errors ?? {}).length !== 1) {
      setQueryComponent(qc);
      return;
    }

    filterFormTemplate.forEach((template) => (qc = handler[template.inputKey](qc)));

    setQueryComponent(qc);
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(qc.id);
    const obj = FilteringHelper.handleFilterChanges(states.root, qc.id, qc);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  }, [component, filterFormTemplate, handler]);

  const handleCountrySelectionConversion = (value: string) =>
    queryComponent.selectedFilterTab === "COUNTRY" && listOfCreationCountries
      ? ConversionUtils.FormatStringToCreationCountryDto(value, listOfCreationCountries)
      : value;

  const handleCountryInputValueChange = () =>
    queryComponent.selectedFilterTab === "COUNTRY"
      ? ConversionUtils.CreationCountryToFormatString(
          listOfCreationCountries?.find(
            (country) => country.countryCode === queryComponent?.selectInput,
          ),
        )
      : (queryComponent?.selectInput ?? "");

  const handleValueChanges = (key: FilteringFormInputKeys, value: string) => {
    const handler3: GenericHandlerType<FilteringFormInputKeys, QueryComponent> = {
      [FilteringFormInputKeys.SelectInput]: {
        ...queryComponent,
        selectInput: handleCountrySelectionConversion(value),
        secondSelectInput: undefined,
        errors: {
          ...queryComponent?.errors,
          selectInput: "",
          secondSelectInput: "",
        },
      },
      [FilteringFormInputKeys.SecondSelectInput]: {
        ...queryComponent,
        secondSelectInput: value,
        errors: {
          ...queryComponent?.errors,
          secondSelectInput: "",
        },
      },
      [FilteringFormInputKeys.OperatorInput]: {
        ...queryComponent,
        operatorInput: ConversionUtils.OperatorItemNamesToOperatorItems(value) as QueryConditions,
        errors: {
          ...queryComponent?.errors,
          operatorInput: "",
        },
      },
    };
    setComponent(handler3[key]);

    // ---

    if (
      key === FilteringFormInputKeys.SelectInput &&
      queryComponent.selectedFilterTab === "EXIF_DATA"
    ) {
      setSecondSelectInputOptions(undefined);
      const keyId = getExifKeyIdByValue(value);

      if (!keyId) {
        return;
      }

      updateSecondSelectInputOptions(keyId);
    }
  };

  const getExifKeyIdByValue = useMemo(
    () =>
      (value: string): number | undefined =>
        listOfExifKeys?.find((key) => key.name === value)?.id,
    [listOfExifKeys],
  );

  useEffect(() => {
    if (queryComponent.selectedFilterTab === "EXIF_DATA" && queryComponent.selectInput) {
      const keyId = getExifKeyIdByValue(queryComponent.selectInput);

      if (!keyId) {
        return;
      }

      if (exifCacheStorage[keyId]) {
        setSecondSelectInputOptions(exifCacheStorage[keyId].entry);
      } else {
        updateSecondSelectInputOptions(keyId);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getExifKeyIdByValue, exifCacheStorage]);

  const updateSecondSelectInputOptions = (keyId: number) => {
    getExifDataListByExifKey(keyId)
      .then((res) => {
        setSecondSelectInputOptions(res);
        const newCache = {
          ...exifCacheStorage,
          [keyId]: {
            entry: res,
          },
        };
        dispatch(setExifCacheStorage(newCache));
      })
      .catch(() => setSecondSelectInputOptions([]));
  };

  const renderInputField = (template: FilterFormTemplate) => {
    const isComponentLoading =
      (template.options === undefined &&
        template.inputKey !== FilteringFormInputKeys.SecondSelectInput) ||
      (secondSelectInputOptions === undefined &&
        template.inputKey === FilteringFormInputKeys.SecondSelectInput);
    const inputTitle = isComponentLoading ? "" : template.inputTitle;
    const progressBarWithLabel = isComponentLoading ? (
      <div className="flex-gap">
        <StyledCircularProgressOverlay styles={{ isBackgroundHidden: true }} size={24} />
        <div style={{ color: "gray" }}>{"Loading..."}</div>
      </div>
    ) : undefined;

    const handler2: GenericHandlerType<FilteringFormInputKeys, JSX.Element> = {
      [FilteringFormInputKeys.SelectInput]: (
        <StyledInputHolder>
          <StyledSelectComponent
            icon={progressBarWithLabel}
            inputTitle={inputTitle}
            options={template.options ?? []}
            inputValue={handleCountryInputValueChange() ?? ""}
            setValue={(value) => handleValueChanges(FilteringFormInputKeys.SelectInput, value)}
            isDisabled={isComponentLoading}
            errorMessage={queryComponent.errors?.selectInput}
          />
        </StyledInputHolder>
      ),
      [FilteringFormInputKeys.SecondSelectInput]: queryComponent?.selectInput ? (
        <StyledInputHolder>
          <StyledSelectComponent
            icon={progressBarWithLabel}
            inputTitle={inputTitle}
            options={secondSelectInputOptions ?? []}
            inputValue={queryComponent.secondSelectInput ?? ""}
            setValue={(value) =>
              handleValueChanges(FilteringFormInputKeys.SecondSelectInput, value)
            }
            isDisabled={secondSelectInputOptions === undefined || !queryComponent?.selectInput}
            errorMessage={queryComponent.errors?.secondSelectInput}
          />
        </StyledInputHolder>
      ) : (
        <></>
      ),
      [FilteringFormInputKeys.OperatorInput]: (
        <StyledInputHolder
          $elementWidth={
            template.inputKey === FilteringFormInputKeys.OperatorInput ? "50%" : undefined
          }
        >
          <StyledSelectComponent
            icon={progressBarWithLabel}
            inputTitle={inputTitle}
            options={template.options ?? []}
            inputValue={
              ConversionUtils.OperatorItemsToOperatorItemNames(queryComponent.operatorInput) ?? ""
            }
            setValue={(value) => handleValueChanges(FilteringFormInputKeys.OperatorInput, value)}
            isDisabled={isComponentLoading}
            errorMessage={queryComponent.errors?.operatorInput}
          />
        </StyledInputHolder>
      ),
    };

    return handler2[template.inputKey];
  };

  return (
    <>
      {filterFormTemplate.map((template, index) => (
        <Fragment key={index}>{renderInputField(template)}</Fragment>
      ))}
    </>
  );
};

export default FilteringInputField;
