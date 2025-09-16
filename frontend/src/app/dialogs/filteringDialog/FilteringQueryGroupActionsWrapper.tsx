import { QueryTypes } from "@model/enum";
import { QueryMultiType } from "@model/QueryBuilderModel";
import Divider from "@mui/material/Divider";
import FilteringQueryGroupActions from "./FilteringQueryGroupActions";
import { styled } from "@mui/material";

type Props = {
  isDisplayed: boolean;
  queryMultiType: QueryMultiType;
};

const FilteringQueryGroupActionsWrapper = ({ isDisplayed, queryMultiType }: Props) => {
  return (
    queryMultiType.queryType === QueryTypes.QUERY_GROUP && (
      <StyledQueryGroupActionsWrapper $displayed={isDisplayed}>
        <Divider orientation="vertical" variant="middle" flexItem />
        <FilteringQueryGroupActions id={queryMultiType.id} />
      </StyledQueryGroupActionsWrapper>
    )
  );
};

export default FilteringQueryGroupActionsWrapper;

const StyledQueryGroupActionsWrapper = styled("div")<{ $displayed: boolean }>((props) => ({
  display: "flex",
  visibility: props.$displayed ? "visible" : "hidden",
}));
