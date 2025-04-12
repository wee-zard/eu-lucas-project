import { BoundingBoxDialogImage } from "./BoundingBoxDialogImage";
import styled from "@emotion/styled";
import BoundingBoxDialogTabs from "./BoundingBoxDialogTabs";

const BoundingBoxDialogContent = () => {
  return (
    <StyledBoundingBoxDialogHolder>
      <BoundingBoxDialogImage />
      <BoundingBoxDialogTabs />
    </StyledBoundingBoxDialogHolder>
  );
};

export default BoundingBoxDialogContent;

const StyledBoundingBoxDialogHolder = styled.div({
  display: "flex",
  width: "100%",
  gap: "8px",
});
