import styled from "@emotion/styled";
import { IdUtils } from "@helper/idUtils";
import ImageDto from "@model/dto/ImageDto";
import { StyledCardTemplate } from "@screens/filteringScreen/FilteringCommonStyledComponents";
import { handleClickOnGlobalRippleEffect } from "app/scripts/rippleEffectOnClick";
import PageableResponse from "@model/response/PageableResponse";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import { useEffect, useState } from "react";
import { StyledComponentGap } from "@global/globalStyles";
import ImageCardInnerElements from "./ImageCardInnerElements";
import EventListenerType from "@model/types/EventListenerType";
import EventListenerUtil from "@helper/eventListenerUtil";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";

type Props = {
  event?: EventListenerType;
  content: {
    emptyContentText: string;
    nullResultContentText: string;
  };
  pageableResponse?: PageableResponse<QueriedImagePropertyType>;
  imageActions: SelectedImageAction[];
  isRippleDisabled?: boolean;
  isMenuDisabled?: boolean;
  handleClickOnRippleImage: (imageProperties: QueriedImagePropertyType) => void;
};

const ImageAndPaginationCard = ({
  event,
  content,
  pageableResponse,
  imageActions,
  isRippleDisabled,
  isMenuDisabled,
  handleClickOnRippleImage,
}: Props) => {
  const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);

  useEffect(() => {
    if (!event) {
      return;
    }

    EventListenerUtil.create({
      ...event,
      method: handleImageSelection,
    });

    return () =>
      EventListenerUtil.removeEventListener({
        ...event,
        method: handleImageSelection,
      });
  }, [event]);

  const isImagePresentInSelectedImages = (imageDto: ImageDto): boolean =>
    selectedImageIds.includes(imageDto.id);

  const handleImageSelection = (param: ImageDto[] | CustomEvent) => {
    let res = [...selectedImageIds];
    let listOfImages: ImageDto[] = [];

    if (param instanceof CustomEvent) {
      listOfImages = [...param.detail];
    } else {
      listOfImages = [...param];
    }

    listOfImages.forEach((imageDto) => {
      res = isImagePresentInSelectedImages(imageDto)
        ? res.filter((id) => id !== imageDto.id)
        : [...res, imageDto.id];
    });

    setSelectedImageIds(res);
  };

  const renderImageCardContent = (imageProperties: QueriedImagePropertyType): JSX.Element => {
    const filteredImageCardDivId = IdUtils.GetFilteredImageCardDivId(imageProperties.image.id);

    return !isRippleDisabled ? (
      <StyledCard
        key={imageProperties.image.id}
        id={filteredImageCardDivId}
        is_card_selected={+isImagePresentInSelectedImages(imageProperties.image)}
        onClick={(event) => {
          handleImageSelection([imageProperties.image]);
          handleClickOnRippleImage({
            ...imageProperties,
            image: { ...imageProperties.image, base64Src: undefined },
          });
          handleClickOnGlobalRippleEffect(event, filteredImageCardDivId);
        }}
      >
        {renderImageCardInnerElements(imageProperties)}
      </StyledCard>
    ) : (
      <StyledCardTemplate key={imageProperties.image.id}>
        {renderImageCardInnerElements(imageProperties)}
      </StyledCardTemplate>
    );
  };

  const renderImageCardInnerElements = (imageProperties: QueriedImagePropertyType): JSX.Element => {
    return (
      <ImageCardInnerElements
        imageProperties={imageProperties}
        imageActions={imageActions}
        isMenuDisabled={isMenuDisabled}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <div>
        <StyledComponentGap display={"grid"}>
          <StyledCardsHolder gap={"16px"}>
            {pageableResponse?.content.map(renderImageCardContent)}
          </StyledCardsHolder>
        </StyledComponentGap>
      </div>
    );
  };

  return (
    <>
      {Number(pageableResponse?.content.length) > 0 ? (
        renderContent()
      ) : (
        <StyledImagePlaceholder>
          <div>
            {!pageableResponse ? content?.emptyContentText : content?.nullResultContentText}
          </div>
        </StyledImagePlaceholder>
      )}
    </>
  );
};

export default ImageAndPaginationCard;

const StyledCard = styled(StyledCardTemplate)<{ is_card_selected: number }>((props) => ({
  "&.MuiPaper-root": {
    background: props.is_card_selected
      ? "linear-gradient(to right bottom, #ffffff, #ffff00aa, #00000050)"
      : "#00000020",

    // Properties of the ripple.
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    span: {
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      width: "100px",
      height: "100px",
      animation: "ripple 1s",
      opacity: "0",
    },
  },
}));

const commonStyles = {
  padding: 8,
  marginBottom: 4,
  marginRight: 2,
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const StyledImagePlaceholder = styled("div")({
  ...commonStyles,
  fontStyle: "italic",
  fontWeight: "bold",
});

const StyledCardsHolder = styled(StyledComponentGap)({
  flexWrap: "wrap",
  justifyContent: "center",
});
