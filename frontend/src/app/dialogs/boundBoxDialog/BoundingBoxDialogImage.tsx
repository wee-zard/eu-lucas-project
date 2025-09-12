import styled from "@emotion/styled";
import { StyledScrollBarHolder } from "@global/globalStyles";
import { selectSelectedListOfProcedureLogs } from "@redux/selectors/procedureLogSelector";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "@redux/selectors/imageSelector";
import ImageCanvas from "@cards/imageCanvas/ImageCanvas";

export const BoundingBoxDialogImage = () => {
  const selectedListOfProcedureLogs = useSelector(selectSelectedListOfProcedureLogs);
  const selectedImage = useSelector(selectSelectedImage);

  return (
    selectedImage && (
      <StyledBoundingBoxDialogImageHolder>
        <ImageCanvas
          imageProperty={{
            image: selectedImage,
            logs: selectedListOfProcedureLogs,
          }}
        />
      </StyledBoundingBoxDialogImageHolder>
    )
  );
};

const StyledBoundingBoxDialogImageHolder = styled(StyledScrollBarHolder)({
  width: "60%",
  height: "100%",
  padding: 8,
  alignContent: "center",
});
