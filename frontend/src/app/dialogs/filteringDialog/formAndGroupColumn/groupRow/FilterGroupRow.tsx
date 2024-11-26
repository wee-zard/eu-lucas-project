import styled from "@emotion/styled";
import React from "react";
import {StyledScrollBarHolder, windowBorders} from "../../../../global/globalStyles";
import FormDataGrid from "./FormDataGrid";

const FilterGroupRow = () => {
  return (
    <StyledDialogColumnHolder>
      <StyledFormHeaderHolder>
        <FormDataGrid />
      </StyledFormHeaderHolder>
    </StyledDialogColumnHolder>
  );
};

export default FilterGroupRow;

const StyledDialogColumnHolder = styled(StyledScrollBarHolder)<{}>((props) => ({
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
