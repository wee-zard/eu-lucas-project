import React, { useEffect, useState } from "react";
import {
  StyledComponentGap,
  windowBorders,
} from "../../../../global/globalStyles";
import styled from "@emotion/styled";
import { StyledTextHolder } from "../../selectionColumn/FilterSelectionColumn";
import FilterHeaderFormDisplayer from "./FilterHeaderFormDisplayer";
import { useSelector } from "react-redux";
import { selectSelectedFilterTab } from "../../../../redux/selectors/imageSelector";
import {
  FilterDialogFilterOptions,
  FilteringFormInputKeys,
} from "../../../../model/enum";
import { FilterFormGroups } from "../../../../model/FilterFormComponents";
import { useCreationCountryStorageInit, useCreationDirectionStorageInit, useCreationYearStorageInit } from "../../../../hooks/useStorageInit";
import { operatorSpecificItems } from "../../../../helper/filterFormUtils";
import { FilterFormTemplate } from "../../../../model/FilterFormTemplate";

type DisplayingForm = {
  title: string;
  filteringFormTemplate: FilterFormTemplate[];
};

const FilterHeaderFormTemplate = () => {
  const selectedFilterTab = useSelector(selectSelectedFilterTab);
  const [componentToRender, setComponentToRender] = useState<DisplayingForm>();
  const defaultFilterformGroup: FilterFormGroups = {selectedFilterTab: selectedFilterTab};

  const listOfCreationYears = useCreationYearStorageInit();
  const selectedYearOptions = listOfCreationYears.map((obj) => obj.year.toString());

  const listOfCreationCountries = useCreationCountryStorageInit();
  const selectedCountryOptions = listOfCreationCountries.map((obj) => `(${obj.countryCode}) ${obj.countryName}`);

  const listOfCreationDirections = useCreationDirectionStorageInit();
  const selectedDirectionOptions = listOfCreationDirections.map((obj) => obj.directionName);

  const handleInitOfComponentToRender = () => {
    if (selectedFilterTab.toString()) {
      const handler = Object.freeze({
        [FilterDialogFilterOptions.Year]: () =>
          setComponentToRender({
            title: "Kép készítés éve",
            filteringFormTemplate: [
              {
                inputTitle: "Év",
                options: selectedYearOptions.sort(),
                inputKey: FilteringFormInputKeys.SelectInput,
              },
              {
                inputTitle: "Operáció",
                options: operatorSpecificItems.sort(),
                inputKey: FilteringFormInputKeys.OperatorInput,
              },
            ],
          }),
        [FilterDialogFilterOptions.Country]: () =>
          setComponentToRender({
            title: "Kép készítés országa",
            filteringFormTemplate: [
              {
                inputTitle: "Ország",
                options: selectedCountryOptions.sort(),
                inputKey: FilteringFormInputKeys.SelectInput,
              },
              {
                inputTitle: "Operáció",
                options: operatorSpecificItems.sort(),
                inputKey: FilteringFormInputKeys.OperatorInput,
              },
            ],
          }),
        [FilterDialogFilterOptions.Coordinates]: () =>
          setComponentToRender({
            title: "Kép koordinátái",

            /** TODO: ... */
            filteringFormTemplate: [],
          }),
        [FilterDialogFilterOptions.Direction]: () =>
          setComponentToRender({
            title: "Kép készítés iránya",
            filteringFormTemplate: [
              {
                inputTitle: "Irány",
                options: selectedDirectionOptions.sort(),
                inputKey: FilteringFormInputKeys.SelectInput,
              },
              {
                inputTitle: "Operáció",
                options: operatorSpecificItems.sort(),
                inputKey: FilteringFormInputKeys.OperatorInput,
              },
            ],
          }),
        [FilterDialogFilterOptions.ExifData]: () =>
          setComponentToRender({
            title: "Kép exif adatai",

            /** TODO: ... */
            filteringFormTemplate: [],
          }),
        [FilterDialogFilterOptions.Plant]: () =>
          setComponentToRender({
            title: "Képen detektált növények",

            /** TODO: ... */
            filteringFormTemplate: [],
          }),
        [FilterDialogFilterOptions.Algorith]: () =>
          setComponentToRender({
            title: "Képelemző algoritmus",

            /** TODO: ... */
            filteringFormTemplate: [],
          }),
      });
      handler[selectedFilterTab].call(() => null);
    }
  };

  useEffect(() => {
    handleInitOfComponentToRender();
  }, [selectedFilterTab]);

  return (
    <StyledDialogColumnHolder>
      <StyledFormHeaderHolder>
        <StyledTextHolder>{componentToRender?.title}</StyledTextHolder>
      </StyledFormHeaderHolder>
      <StyledFormHeaderHolder display={"flow"}>
        <CustomComponentGap>
          {componentToRender && componentToRender.filteringFormTemplate.length > 0 ? (
            <FilterHeaderFormDisplayer
              defaultFilterFormGroup={defaultFilterformGroup}
              filteringFormTemplate={componentToRender?.filteringFormTemplate}
            />
          ) : (
            <React.Fragment>
              {componentToRender?.title} will be implemented here...
            </React.Fragment>
          )}
        </CustomComponentGap>
      </StyledFormHeaderHolder>
    </StyledDialogColumnHolder>
  );
};

export default FilterHeaderFormTemplate;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: "16px",
  flexDirection: "column",
  ...windowBorders(),
}));

const CustomComponentGap = styled(StyledComponentGap)<{}>(() => ({
  display: "grid",
  gap: "32px",
  padding: "8px 0 8px 0",
}));

const StyledFormHeaderHolder = styled.div<{ display?: string }>((props) => ({
  width: "100%",
  display: props.display ?? "flex",
  justifyContent: "center",
}));
