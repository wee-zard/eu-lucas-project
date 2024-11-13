import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selectSelectedFilterTab } from "../../../redux/selectors/imageSelector";
import { FilterDialogFilterOptions } from "../../../model/enum";
import FilteringCreationYearsForm from "./creationYearForm/FilteringCreationYearsForm";
import { windowBorders } from "../../../global/globalStyles";

const FilterFormColumn = () => {

  const selectedFilterTab = useSelector(selectSelectedFilterTab);

  const fetchDisplayedFilterForm = () => {
    switch(selectedFilterTab) {
      case FilterDialogFilterOptions.Year:
        return <FilteringCreationYearsForm />;

      /** TODO: Implement the Country form */
      case FilterDialogFilterOptions.Country:
        return <React.Fragment>222</React.Fragment>;
      
      /** TODO: Implement the Coordinates form */
      case FilterDialogFilterOptions.Coordinates:
        return <React.Fragment>333</React.Fragment>;

      /** TODO: Implement the Direction form */
      case FilterDialogFilterOptions.Direction:
        return <React.Fragment>444</React.Fragment>;

      /** TODO: Implement the Direction form */
      case FilterDialogFilterOptions.ExifData:
        return <React.Fragment>555</React.Fragment>;
    }
  }

  return (
    <StyledDialogColumnHolder>
      {fetchDisplayedFilterForm()}
    </StyledDialogColumnHolder>
  );
};

export default FilterFormColumn;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "80%",
  height: "100%",
  ...windowBorders(),
}));
