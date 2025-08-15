import styled from "@emotion/styled";
import { StyledComponentGap } from "@global/globalStyles";
import FilteringScreenImageAlert from "./FilteringScreenImageAlert";
import FilteringScreenImageAndPaginationCard from "./FilteringScreenImageAndPaginationCard";

const FilteringScreenBody = () => {
  return (
    <div className="grid-gap24">
      <FilteringScreenImageAlert />
      <StyledCardsHolder>
        <FilteringScreenImageAndPaginationCard />
      </StyledCardsHolder>
    </div>
  );
};

export default FilteringScreenBody;

const StyledCardsHolder = styled(StyledComponentGap)({
  flexWrap: "wrap",
  display: "grid",
  minHeight: 650,
});
