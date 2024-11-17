import styled from "@emotion/styled";
import React from "react";
import {windowBorders} from "../../../../global/globalStyles";

const FilterGroupRow = () => {
  return (
    <StyledDialogColumnHolder>
      <StyledFormHeaderHolder>11111</StyledFormHeaderHolder>
    </StyledDialogColumnHolder>
  );
};

export default FilterGroupRow;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "100%",
  height: "100%",
  ...windowBorders(),
}));

const StyledFormHeaderHolder = styled.div<{}>({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "16px 0 16px 0",
});
