import React from "react";
import styled from "@emotion/styled";

const FilterFormColumn = () => {
  return (
    <StyledDialogColumnHolder style={{ border: "1px solid green" }}>
      123
    </StyledDialogColumnHolder>
  );
};

export default FilterFormColumn;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "100%",
  height: "100%",
}));
