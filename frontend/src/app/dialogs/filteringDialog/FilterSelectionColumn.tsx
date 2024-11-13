import React from "react";
import styled from "@emotion/styled";
import List from "@mui/material/List";
import { listItemOptions } from "../../global/globalConsts";
import StyledListItemButton from "../../cards/StyledListItemButton";
import { windowBorders } from "../../global/globalStyles";

const FilterSelectionColumn = () => {
  return (
    <StyledDialogColumnHolder>
      <StyledTextHolder>Szűrési opciók</StyledTextHolder>
      <StyledList>
        {listItemOptions.map((item) => (
          <StyledListItemButton listItem={item} />
        ))}
      </StyledList>
    </StyledDialogColumnHolder>
  );
};

export default FilterSelectionColumn;

const StyledList = styled(List)<{}>((props) => ({
  display: "grid",
  gap: "8px",
}));

export const StyledTextHolder = styled.div<{}>((props) => ({
  fontSize: "18px",
  display: "flex",
  justifyContent: "center",
  paddingTop: "16px",
}));

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "50%",
  height: "100%",
  gap: "16px",
  display: "flex",
  flexDirection: "column",
  ...windowBorders(),
}));
