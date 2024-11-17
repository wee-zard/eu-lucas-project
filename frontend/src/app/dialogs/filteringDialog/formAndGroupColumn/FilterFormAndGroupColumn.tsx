import React from "react";
import FilterGroupRow from "./groupRow/FilterGroupRow";
import FilterHeaderFormTemplate from "./formRow/FilterHeaderFormTemplate";
import styled from "@emotion/styled";

const FilterFormAndGroupColumn = () => {

  return (
    <StyledDialogColumnHolder style={{ display: "grid", gap: "16px" }}>
      <FilterHeaderFormTemplate />
      <FilterGroupRow />
    </StyledDialogColumnHolder>
  );
};

export default FilterFormAndGroupColumn;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "100%",
  height: "100%",
}));