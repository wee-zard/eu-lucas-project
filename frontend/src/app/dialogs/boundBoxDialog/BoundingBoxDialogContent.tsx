import { BoundingBoxDialogImage } from "./BoundingBoxDialogImage";
import styled from "@emotion/styled";
import BoundingBoxDialogTabs from "./BoundingBoxDialogTabs";
import { StyledDialogContent } from "@dialogs/filteringDialog/FilteringDialog";

const BoundingBoxDialogContent = () => {
  return (
    <StyledDialogContent>
      <StyledBoundingBoxDialogHolder>
        <BoundingBoxDialogImage />
        <BoundingBoxDialogTabs />
      </StyledBoundingBoxDialogHolder>
    </StyledDialogContent>
  );
};

export default BoundingBoxDialogContent;

const StyledBoundingBoxDialogHolder = styled.div({
  display: "flex",
  width: "100%",
  gap: "8px",
});
