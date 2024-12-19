import StyledSelectComponent from "app/components/StyledSelectComponent";
import StyledTextFieldComponent from "app/components/StyledTextFieldComponent";
import {
  FilterDialogFilterOptions,
  FilteringFormInputKeys,
} from "app/model/enum";
import { OperatorItems } from "app/model/FilterFormComponents";
import { FilterFormTemplate } from "app/model/FilterFormTemplate";
import React from "react";
import { QueryComponent } from "app/model/QueryBuilderModel";
import { StyledInputHolder } from "./FilteringMenu";

type Props = {
  filteringFormTemplate: FilterFormTemplate[];
  selectedFilterTab?: FilterDialogFilterOptions;
  component: QueryComponent;
  setComponent: (queryComponent: QueryComponent) => void;
};

const FilteringInputComponent = ({
  filteringFormTemplate,
  selectedFilterTab,
  component,
  setComponent,
}: Props) => {

  console.log("[FilteringInputComponent]: rendered");

  //const dispatch = useDispatch();
  //const filterFormDataGrid = useSelector(selectFilterFormDataGrid);
  /*
  const defaultComponent: QueryComponent = {
    id: getNewIdToElement(),
    selectedFilterTab: selectedFilterTab,
  };
  */

  //const [component, setComponent] = useState<QueryComponent>(defaultComponent);
  /*
  const isSaveButtonDisabled = !(
    filteringFormTemplate.length ===
    Object.keys(component).length - 1
  );
  */

  /*
  const handleOnSubmit = () => {
    /*
    // TODO: Remove this method, or save the values.
    if (!isSaveButtonDisabled) {
      saveFilterFormComponent(
        component,
        filterFormDataGrid,
        dispatch
      );
      setComponent(defaultComponent);
    } else {
      throwNotification(
        NotificationSeverity.Warning,
        "Figyelmeztetés! Csak akkor mentheted el az űrlapot, ha minden elemet kitöltöttél."
      );
    }
  };
  */

  const handleValueChanges = (key: FilteringFormInputKeys, value: string) => {
    const handler = Object.freeze({
      [FilteringFormInputKeys.SelectInput]: () =>
        setComponent({
          ...component,
          selectInput: value,
        }),
      [FilteringFormInputKeys.OperatorInput]: () =>
        setComponent({
          ...component,
          operatorInput: value as OperatorItems,
        }),
      [FilteringFormInputKeys.TextfieldInput]: () =>
        setComponent({
          ...component,
          textFieldInput: value,
        }),
    });
    handler[key].call(() => null);
  };

  const renderStyledInput = (inputKey: FilteringFormInputKeys) => {
    const obj = filteringFormTemplate.find(
      (form) => form.inputKey === inputKey
    );
    const formInputValue = Object.entries(component)
      .find((pair) => pair[0] === obj?.inputKey)?.[1]
      ?.toString();
    if (obj) {
      switch (inputKey) {
        case FilteringFormInputKeys.SelectInput:
        case FilteringFormInputKeys.OperatorInput:
          return (
            <StyledInputHolder
              $elementWidth={
                inputKey === FilteringFormInputKeys.OperatorInput
                  ? "50%"
                  : undefined
              }
            >
              <StyledSelectComponent
                inputTitle={obj.inputTitle}
                options={obj.options ?? []}
                inputValue={formInputValue ?? ""}
                setValue={(value) => handleValueChanges(obj.inputKey, value)}
              />
            </StyledInputHolder>
          );
        case FilteringFormInputKeys.TextfieldInput:
          return (
            <StyledInputHolder>
              <StyledTextFieldComponent
                inputTitle={obj.inputTitle}
                inputValue={formInputValue ?? ""}
                setValue={(value) => handleValueChanges(obj.inputKey, value)}
              />
            </StyledInputHolder>
          );
      }
    }
  };

  return (
    <React.Fragment>
      <React.Fragment>
        {renderStyledInput(FilteringFormInputKeys.SelectInput)}
        {renderStyledInput(FilteringFormInputKeys.OperatorInput)}
      </React.Fragment>
      {selectedFilterTab === FilterDialogFilterOptions.ExifData ? (
        <React.Fragment>
          {renderStyledInput(FilteringFormInputKeys.TextfieldInput)}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default FilteringInputComponent;
