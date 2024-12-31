import React from "react";
import styled from "@emotion/styled";
import { StyledComponentGap } from "@global/globalStyles";
import { useSelector } from "react-redux";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
import ImageCard from "@dialogs/filteringDialog/ImageCard";

const FilteringScreenBody = () => {
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  return (
    <div>
      {listOfSelectedImages.length === 0 ? (
        <StyledEmptyBody>Nincsen még kép kiválasztva!</StyledEmptyBody>
      ) : (
        <StyledCardsHolder>
          {listOfSelectedImages.map((selectedImageModel) =>
            selectedImageModel.images.map((imageDto) => (
              <React.Fragment key={`${selectedImageModel.id}-${imageDto.id}`}>
                <ImageCard
                  imageDto={imageDto}
                  imageModel={selectedImageModel}
                />
              </React.Fragment>
            ))
          )}
        </StyledCardsHolder>
      )}
    </div>
  );
};

export default FilteringScreenBody;

const StyledCardsHolder = styled(StyledComponentGap)<{}>((props) => ({
  flexWrap: "wrap",
  display: "flex",
}));

const StyledEmptyBody = styled.div<{}>((props) => ({
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic",
  fontWeight: "bold",
}));
