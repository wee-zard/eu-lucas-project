import React from "react";
import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import i18n from "@i18n/i18nHandler";
import {
  handleOnClickAddFilterCondition,
  handleOnClickRemoveQueryGroup,
} from "./helper/FilteringModificationHelper";

type Props = {
  id: number;
};

const FilteringQueryGroupActions = React.memo(function FilteringQueryGroupActions({ id }: Props) {
  return (
    <StyledGroupActionsHolder>
      <StyledIconButton
        buttonIcon={<AddCircleOutlineIcon />}
        tooltip={{
          tooltipTitle: i18n.t("screens.filtering.query-builder.addFilterConditionTooltip"),
          tooltipPlacement: "top",
        }}
        onClick={() => handleOnClickAddFilterCondition(id)}
      />
      <StyledIconButton
        buttonIcon={<DeleteForeverOutlinedIcon />}
        buttonColor={"warning"}
        tooltip={{
          tooltipTitle: i18n.t("screens.filtering.query-builder.removeQueryGroupTooltip"),
          tooltipPlacement: "top",
        }}
        onClick={() => handleOnClickRemoveQueryGroup(id)}
      />
    </StyledGroupActionsHolder>
  );
});

export default FilteringQueryGroupActions;

const StyledGroupActionsHolder = styled.div<{}>((_) => ({
  display: "flex",
  gap: 8,
  justifyContent: "end",
  alignItems: "center",
  padding: "0 8px 0 8px",
}));
