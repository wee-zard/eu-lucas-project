import { BoundingBoxDialogImage } from "./canvas/BoundingBoxDialogImage";
import styled from "@emotion/styled";
import BoundingBoxDialogTabs from "./BoundingBoxDialogTabs";
import { StyledDialogContent } from "@dialogs/filteringDialog/FilteringDialog";
import getRandomIdentification from "@helper/randomGeneratorHelper";

const BoundingBoxDialogContent = () => {
  return (
    <StyledDialogContent>
      <StyledBoundingBoxDialogHolder>
        <BoundingBoxDialogImage uniqueId={getRandomIdentification()} />
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
