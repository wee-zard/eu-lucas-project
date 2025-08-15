import styled from "@emotion/styled";
import { IdUtils } from "@helper/idUtils";
import ImageDto from "@model/dto/ImageDto";
import { StyledCardTemplate } from "@screens/filteringScreen/FilteringCommonStyledComponents";
import { handleClickOnGlobalRippleEffect } from "app/scripts/rippleEffectOnClick";
import StyledImageMediaCard from "@cards/imageAndPaginationCard/StyledImageMediaCard";
import PageableResponse from "@model/response/PageableResponse";
import i18n from "@i18n/i18nHandler";
import ImageAndPaginationCardContent from "./ImageAndPaginationCardContent";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import { useState } from "react";
import { StyledComponentGap } from "@global/globalStyles";

type Props = {
  content: {
    emptyContentText: string;
    nullResultContentText: string;
  };
  pageableResponse?: PageableResponse<ImageDto>;
  imageActions: SelectedImageAction[];
  isRippleDisabled?: boolean;
  isMenuDisabled?: boolean;
  handleClickOnRippleImage: (imageDto: ImageDto) => void;
};

const ImageAndPaginationCard = ({
  content,
  pageableResponse,
  imageActions,
  isRippleDisabled,
  isMenuDisabled,
  handleClickOnRippleImage,
}: Props) => {
  const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);

  const renderImageCardInnerElements = (imageDto: ImageDto): JSX.Element => {
    return (
      <>
        <StyledImageMediaCard
          imageDto={imageDto}
          alt={i18n.t("cards.image-card.alt.image-media", { id: imageDto.id })}
        />
        <ImageAndPaginationCardContent
          imageDto={imageDto}
          imageActions={imageActions}
          isMenuDisabled={isMenuDisabled}
        />
      </>
    );
  };

  const isImagePresentInSelectedImages = (imageDto: ImageDto): boolean =>
    selectedImageIds.includes(imageDto.id);

  const handleSelectedImagesChange = (imageDto: ImageDto) => {
    setSelectedImageIds(
      isImagePresentInSelectedImages(imageDto)
        ? selectedImageIds.filter((id) => id !== imageDto.id)
        : [...selectedImageIds, imageDto.id],
    );
  };

  const renderImageCardContent = (imageDto: ImageDto): JSX.Element => {
    const filteredImageCardDivId = IdUtils.GetFilteredImageCardDivId(imageDto.id);

    return !isRippleDisabled ? (
      <StyledCard
        key={imageDto.id}
        id={filteredImageCardDivId}
        is_card_selected={+isImagePresentInSelectedImages(imageDto)}
        onClick={(event) => {
          handleSelectedImagesChange(imageDto);
          handleClickOnRippleImage(imageDto);
          handleClickOnGlobalRippleEffect(event, filteredImageCardDivId);
        }}
      >
        {renderImageCardInnerElements(imageDto)}
      </StyledCard>
    ) : (
      <StyledCardTemplate key={imageDto.id}>
        {renderImageCardInnerElements(imageDto)}
      </StyledCardTemplate>
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

  // TODO: Maybe a generic message should be better here.
  const renderNullResultContent = (): JSX.Element => {
    return <div>{content.nullResultContentText}</div>;
  };

  // TODO: Maybe a generic message should be better here.
  const renderEmptyContent = (): JSX.Element => {
    return <div>{content.emptyContentText}</div>;
  };

  return (
    <>
      {Number(pageableResponse?.content.length) > 0 ? (
        renderContent()
      ) : (
        <StyledImagePlaceholder>
          {!pageableResponse ? renderEmptyContent() : renderNullResultContent()}
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
  height: "90%",
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
