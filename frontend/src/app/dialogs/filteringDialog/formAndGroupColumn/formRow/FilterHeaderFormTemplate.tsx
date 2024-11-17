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
import { useCoordinateXStorageInit, useCoordinateYStorageInit, useCreationCountryStorageInit, useCreationDirectionStorageInit, useCreationYearStorageInit } from "../../../../hooks/useStorageInit";
import { operatorSpecificItems } from "../../../../helper/filterFormUtils";
import { FilterFormTemplate } from "../../../../model/FilterFormTemplate";

type DisplayingForm = {
  title: string;
  filteringFormTemplate: FilterFormTemplate[];
};

const FilterHeaderFormTemplate = () => {
  const listOfCreationYears = useCreationYearStorageInit();
  const listOfCreationCountries = useCreationCountryStorageInit();
  const listOfCreationDirections = useCreationDirectionStorageInit();
  const listOfCoordinateX = useCoordinateXStorageInit();
  const listOfCoordinateY = useCoordinateYStorageInit();
  const selectedFilterTab = useSelector(selectSelectedFilterTab);
  const [componentToRender, setComponentToRender] = useState<DisplayingForm>();
  const defaultFilterformGroup: FilterFormGroups = {selectedFilterTab: selectedFilterTab};

  const handleInitOfComponentToRender = () => {
    if (selectedFilterTab.toString()) {
      const handler = Object.freeze({
        [FilterDialogFilterOptions.Year]: () =>
          setComponentToRender({
            title: "Kép készítés éve",
            filteringFormTemplate: [
              {
                inputTitle: "Év",
                options: listOfCreationYears.map((obj) => obj.year.toString()).sort(),
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
                options: listOfCreationCountries.map((obj) => `(${obj.countryCode}) ${obj.countryName}`).sort(),
                inputKey: FilteringFormInputKeys.SelectInput,
              },
              {
                inputTitle: "Operáció",
                options: operatorSpecificItems.sort(),
                inputKey: FilteringFormInputKeys.OperatorInput,
              },
            ],
          }),
        [FilterDialogFilterOptions.XCoordinates]: () =>
          setComponentToRender({
            title: "Kép X koordinátái",
            filteringFormTemplate: [
              {
                inputTitle: "X Koordináta (alsó határ)",
                options: listOfCoordinateX.map((obj) => obj.coordinateX.toString()).sort(),
                inputKey: FilteringFormInputKeys.SelectInput,
              },
              {
                inputTitle: "Operáció",
                options: operatorSpecificItems.sort(),
                inputKey: FilteringFormInputKeys.OperatorInput,
              },
              {
                inputTitle: "X Koordináta (felső határ)",
                options: listOfCoordinateX.map((obj) => obj.coordinateX.toString()).sort(),
                inputKey: FilteringFormInputKeys.SelectInputSecond,
              },
            ],
          }),
        [FilterDialogFilterOptions.YCoordinates]: () =>
          setComponentToRender({
            title: "Kép Y koordinátái",
            filteringFormTemplate: [
              {
                inputTitle: "Y Koordináta (alsó határ)",
                options: listOfCoordinateY.map((obj) => obj.coordinateY.toString()).sort(),
                inputKey: FilteringFormInputKeys.SelectInput,
              },
              {
                inputTitle: "Operáció",
                options: operatorSpecificItems.sort(),
                inputKey: FilteringFormInputKeys.OperatorInput,
              },
              {
                inputTitle: "Y Koordináta (felső határ)",
                options: listOfCoordinateY.map((obj) => obj.coordinateY.toString()).sort(),
                inputKey: FilteringFormInputKeys.SelectInputSecond,
              },
            ],
          }),
        [FilterDialogFilterOptions.Direction]: () =>
          setComponentToRender({
            title: "Kép készítés iránya",
            filteringFormTemplate: [
              {
                inputTitle: "Irány",
                options: listOfCreationDirections.map((obj) => obj.directionName).sort(),
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
            <React.Fragment
              /** TODO: Remove later, when every element is implemented
               * in the above section.
               */
            >
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
