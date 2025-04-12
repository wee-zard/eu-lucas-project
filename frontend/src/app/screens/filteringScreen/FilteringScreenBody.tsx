import React from "react";
import styled from "@emotion/styled";
import { StyledComponentGap } from "@global/globalStyles";
import { useSelector } from "react-redux";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
import ImageCardRoot from "@cards/imageCard/ImageCardRoot";
import i18n from "@i18n/i18nHandler";

const FilteringScreenBody = () => {
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  return (
    <div>
      {listOfSelectedImages.length === 0 ? (
        <StyledEmptyBody>{i18n.t("screens.filtering.empty-body")}</StyledEmptyBody>
      ) : (
        <StyledCardsHolder>
          {listOfSelectedImages.map((selectedImageModel) =>
            selectedImageModel.images.map((imageProperties) => (
              <React.Fragment key={`${selectedImageModel.id}-${imageProperties.image.id}`}>
                <ImageCardRoot imageDto={imageProperties.image} imageModel={selectedImageModel} />
              </React.Fragment>
            )),
          )}
        </StyledCardsHolder>
      )}
    </div>
  );
};

export default FilteringScreenBody;

const StyledCardsHolder = styled(StyledComponentGap)<{}>((_) => ({
  flexWrap: "wrap",
  display: "flex",
}));

const StyledEmptyBody = styled.div<{}>((_) => ({
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic",
  fontWeight: "bold",
}));
