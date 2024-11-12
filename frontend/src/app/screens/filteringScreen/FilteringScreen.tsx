import React from "react";
import { StyledComponentGap } from "../../global/globalStyles";
import FilteringScreenBody from "./FilteringScreenBody";
import FilteringScreenHeader from "./FilteringScreenHeader";
import FilteringDialog from "../../dialogs/filteringDialog/FilteringDialog";

const FilteringScreen = () => {

  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <FilteringScreenHeader />
      <FilteringScreenBody />
      <FilteringDialog />
    </StyledComponentGap>
  );
};

export default FilteringScreen;
