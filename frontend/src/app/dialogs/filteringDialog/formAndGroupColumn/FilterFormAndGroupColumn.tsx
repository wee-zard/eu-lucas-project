import React from "react";
import FilterGroupRow from "./groupRow/FilterGroupRow";
import FilterHeaderFormTemplate from "./formRow/FilterHeaderFormTemplate";
import styled from "@emotion/styled";

const FilterFormAndGroupColumn = () => {
  return (
    <StyledDialogColumnHolder>
      <FilterHeaderFormTemplate />
      <FilterGroupRow />
    </StyledDialogColumnHolder>
  );
};

export default FilterFormAndGroupColumn;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));
