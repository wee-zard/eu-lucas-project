import StyledIconButton from "@components/StyledIconButton";
import React, { useEffect, useState } from "react";
import StyledSelectComponent from "@components/StyledSelectComponent";
import { FilterDialogFilters } from "@model/enum";
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
import { requestProcedureLogParams } from "@redux/actions/procedureLogParamActions";
import { requestPlantList } from "@redux/actions/plantActions";
// TODO: Allow filtering by plant species.
//import { requestPlantSpeciesList } from "@redux/actions/plantSpeciesActions";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import i18n from "@i18n/i18nHandler";
import { handleComponentRemoval } from "./helper/FilteringModificationHelper";

type Props = {
  id: number;
};

const FilteringQueryComponent = React.memo(function FilteringQueryComponent({ id }: Props) {
  console.log("[FilteringQueryComponent]: rendered");

  const queryByOptions = Object.values(FilterDialogFilters).sort((a, b) => a.localeCompare(b));

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
      selectedFilterTab: selectedFilter as keyof typeof FilterDialogFilters,
      errors: {
        selectedFilterTab: "",
      },
    };
    const obj = FilteringHelper.handleFilterChanges(states.root, id, modifiedQueryComponent);
    LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
    // Update the component itself on changes.
    FilteringHelper.sendUpdateEvent(states.filtered.id);
  };

  const getQueryByInputValue = (selectedFilterTab?: keyof typeof FilterDialogFilters) =>
    ConversionUtils.EnumKeyToEnumValue(FilterDialogFilters, selectedFilterTab) ?? "";

  const setQueryByInputValue = (item: string) => {
    const filterOption = item as FilterDialogFilters;
    handleComponentSelection(
      ConversionUtils.EnumValueToEnumKey(FilterDialogFilters, filterOption) ?? "",
    );
    handleCallOfStorageInit(filterOption);
  };

  /**
   * Request the list of options from the redux storage based on the selected filter option.
   * If the storage is not filled up, then it will be request options from the server. If the
   * storage up-to-date, then it will simply read it from there.
   *
   * @param item The selected filter option to query by.
   */
  const handleCallOfStorageInit = (item: FilterDialogFilters) => {
    const handler: GenericHandlerType<FilterDialogFilters, () => void> = {
      [FilterDialogFilters.YEAR]: () => requestCreationYears(dispatch),
      [FilterDialogFilters.Y_COORDINATE]: () => requestCoordinateYList(dispatch),
      [FilterDialogFilters.X_COORDINATE]: () => requestCoordinateXList(dispatch),
      [FilterDialogFilters.PROCEDURE_PARAMS]: () => requestProcedureLogParams(dispatch),
      [FilterDialogFilters.PROCEDURE_NAME]: () => requestProcedureList(dispatch),
      [FilterDialogFilters.PLANT_NAME]: () => requestPlantList(dispatch),

      // TODO: Allow filtering by plant species.
      //[FilterDialogFilters.PLANT_SPECIES]: () => requestPlantSpeciesList(dispatch),

      [FilterDialogFilters.EXIF_DATA]: () => requestExifKeys(dispatch),
      [FilterDialogFilters.DIRECTION]: () => requestCreationDirections(dispatch),
      [FilterDialogFilters.COUNTRY]: () => requestCreationCountries(dispatch),
      [FilterDialogFilters.IS_HOMOGENOUS]: () => null,
      [FilterDialogFilters.PROBABILITY]: () => null,
    };
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
            inputTitle={i18n.t("screens.filtering.query-builder.queryBy")}
            options={queryByOptions}
            inputValue={getQueryByInputValue(states.filtered?.selectedFilterTab)}
            setValue={setQueryByInputValue}
            styles={{ isBorderLeftStyled: true }}
            errorMessage={states.filtered?.errors?.selectedFilterTab}
          />
        </StyledInputHolder>
        {states.filtered?.selectedFilterTab && (
          <FilteringInputField component={states.filtered} setComponent={handleComponentChange} />
        )}
        <StyledIconButton
          buttonIcon={<DeleteForeverOutlinedIcon />}
          tooltip={{
            tooltipTitle: i18n.t("screens.filtering.query-builder.removeFilterCondition"),
            tooltipPlacement: "right-start",
          }}
          onClick={() => handleComponentRemoval(id)}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <React.Fragment>{element}</React.Fragment>;
});

export default FilteringQueryComponent;

const StyledQueryComponentHolder = styled(StyledComponentGap)<{}>((_) => ({
  justifyContent: "space-between",
}));
