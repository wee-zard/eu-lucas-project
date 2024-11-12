import styled from "@emotion/styled";
import React from "react";

const FilterImagePickerColumn = () => {
  return (
    <StyledDialogColumnHolder style={{ border: "1px solid red" }}>
      123123
    </StyledDialogColumnHolder>
  );
};

export default FilterImagePickerColumn;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "100%",
  height: "100%",
}));
