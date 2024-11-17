import React from "react";
import styled from "@emotion/styled";
import { windowBorders } from "../../../global/globalStyles";

const FilterImagePickerColumn = () => {
  return (
    <StyledDialogColumnHolder>
      xcycyxcxy
    </StyledDialogColumnHolder>
  );
};

export default FilterImagePickerColumn;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  ...windowBorders(),
  width: "100%",
  height: "100%",
  gap: "16px",
  display: "flex",
  flexDirection: "column"
}));
