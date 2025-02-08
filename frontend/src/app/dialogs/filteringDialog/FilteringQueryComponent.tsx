import StyledIconButton from "@components/StyledIconButton";
import React, { useEffect, useState } from "react";
import StyledSelectComponent from "@components/StyledSelectComponent";
import { FilterDialogFilterOptionNames, FilterDialogFilterOptions } from "@model/enum";
import { QueryComponent } from "@model/QueryBuilderModel";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FilteringInputField from "./FilteringInputField";
import { StyledInputHolder } from "./FilteringMenu";
import styled from "@emotion/styled";
import { StyledComponentGap } from "@global/globalStyles";
import { FilteringHelper } from "@helper/filteringHelper";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { ConversionUtils } from "@helper/conversionUtils";
import { IdUtils } from "@helper/idUtils";
import { useDispatch } from "react-redux";
import { requestCreationYears } from "@redux/actions/creationYearActions";
import { requestExifKeys } from "@redux/actions/exifKeyActions";
import { requestCreationDirections } from "@redux/actions/creationDirectionActions";
import { requestCreationCountries } from "@redux/actions/creationCountryActions";
import { requestCoordinateYList } from "@redux/actions/coordinateYActions";
import { requestCoordinateXList } from "@redux/actions/coordinateXActions";
import { requestProcedureList } from "@redux/actions/procedureActions";

type Props = {
  id: number;
};

const FilteringQueryComponent = React.memo(function FilteringQueryComponent({ id }: Props) {
  console.log("[FilteringQueryComponent]: rendered");

  const queryByOptions = Object.values(FilterDialogFilterOptionNames).sort();

  const dispatch = useDispatch();

  const handleComponentChange = (changedComponent: QueryComponent) => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const obj = FilteringHelper.handleFilterChanges(states.root, id, changedComponent);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    // Update the component itself on changes.
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  /**
   * New Filter tab have been selected, and because of that,
   * we need to wipe out every information related to the current
   * query component. This way, null or empty values will be assigned to the input fields.
   */
  const handleComponentSelection = (selectedFilter: string) => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const modifiedQueryComponent: QueryComponent = {
      id: states.filtered.id,
      parentId: states.filtered.parentId,
      selectedFilterTab: selectedFilter as FilterDialogFilterOptions,
    };
    const obj = FilteringHelper.handleFilterChanges(states.root, id, modifiedQueryComponent);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    // Update the component itself on changes.
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  const handleComponentRemoval = () => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const obj = FilteringHelper.handleFilterChanges(states.root, id);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    // Update the parent component itself on component deletion.
    FilteringHelper.sendUpdateEvent(states.filtered.parentId);
  };

  const getQueryByInputValue = (selectedFilterTab?: FilterDialogFilterOptions) =>
    ConversionUtils.FilterOptionsToFilterOptionNames(selectedFilterTab) ?? "";

  const setQueryByInputValue = (item: string) => {
    const filterOption = item as FilterDialogFilterOptionNames;
    handleComponentSelection(ConversionUtils.FilterOptionNamesToFilterOptions(filterOption));
    handleCallOfStorageInit(filterOption);
  };

  /**
   * Request the list of options from the redux storage based on the selected filter option.
   * If the storage is not filled up, then it will be request options from the server. If the
   * storage up-to-date, then it will simply read it from there.
   *
   * @param item The selected filter option to query by.
   */
  const handleCallOfStorageInit = (item: FilterDialogFilterOptionNames) => {
    const handler = Object.freeze({
      [FilterDialogFilterOptionNames.Year]: () => requestCreationYears(dispatch),
      [FilterDialogFilterOptionNames.YCoordinates]: () => requestCoordinateYList(dispatch),
      [FilterDialogFilterOptionNames.XCoordinates]: () => requestCoordinateXList(dispatch),
      [FilterDialogFilterOptionNames.ProcedureParams]: () => null,
      [FilterDialogFilterOptionNames.ProcedureName]: () => requestProcedureList(dispatch),
      [FilterDialogFilterOptionNames.Plant]: () => null,
      [FilterDialogFilterOptionNames.ExifData]: () => requestExifKeys(dispatch),
      [FilterDialogFilterOptionNames.Direction]: () => requestCreationDirections(dispatch),
      [FilterDialogFilterOptionNames.Country]: () => requestCreationCountries(dispatch),
      [FilterDialogFilterOptionNames.Algorithm]: () => null,
    });
    handler[item].call(() => null);
  };

  /**
   * First, check if the selectedFilterTab has any value.
   * - if yes, then display the corresponding input fields with their values.
   * - else display only the select input field.
   */
  const renderComponent = () => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    return (
      <StyledQueryComponentHolder>
        <StyledInputHolder>
          <StyledSelectComponent
            inputTitle={"Query By"}
            options={queryByOptions}
            inputValue={getQueryByInputValue(states.filtered?.selectedFilterTab)}
            setValue={setQueryByInputValue}
          />
        </StyledInputHolder>
        {states.filtered?.selectedFilterTab ? (
          <FilteringInputField component={states.filtered} setComponent={handleComponentChange} />
        ) : null}
        <StyledIconButton
          buttonIcon={<DeleteForeverOutlinedIcon />}
          tooltip={{
            tooltipTitle: "Remove Filter Condition",
            tooltipPlacement: "right-start",
          }}
          onClick={handleComponentRemoval}
        />
      </StyledQueryComponentHolder>
    );
  };

  const [element, setElement] = useState(renderComponent());
  const updateElement = () => setElement(renderComponent());

  useEffect(() => {
    const states = FilteringHelper.getUpdatedStates<QueryComponent>(id);
    const eventName = IdUtils.getEventListenerName(states.filtered.id);
    window.addEventListener(eventName, updateElement);
    return () => window.removeEventListener(eventName, updateElement);
  }, []);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryComponent;

const StyledQueryComponentHolder = styled(StyledComponentGap)<{}>((_) => ({
  paddingRight: "8px",
  justifyContent: "space-between",
}));
