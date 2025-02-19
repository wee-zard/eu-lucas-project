import { getImageByFilters } from "@api/command/imageCommand";
import styled from "@emotion/styled";
import { StyledComponentGap, StyledScrollBarHolder } from "@global/globalStyles";
import { IdUtils } from "@helper/idUtils";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import ImageDto from "@model/dto/ImageDto";
import { MenuActions } from "@model/enum";
import FilteringQueryRequest from "@model/request/FilteringQueryRequest";
import PageableResponse from "@model/response/PageableResponse";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { setFilterMenuAction, setSelectedImage } from "@redux/actions/imageActions";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilteringDialogImageDisplayPagination from "@dialogs/filteringDialog/FilteringDialogImageDisplayPagination";
import { StyledCardTemplate } from "@screens/filteringScreen/FilteringCommonStyledComponents";
import { Divider } from "@mui/material";
import { handleClickOnGlobalRippleEffect } from "app/scripts/rippleEffectOnClick";
import StyledImageMediaCard from "@cards/StyledImageMediaCard";

const FilteringDialogImageDisplay = () => {
  const { filterMenuAction, filteringPageableProperties, selectedImage } =
    useSelector(selectImageStorage);
  const [response, setResponse] = useState<PageableResponse<ImageDto>>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      filterMenuAction === MenuActions.SUBMIT ||
      filterMenuAction === MenuActions.PAGINATION_CHANGE
    ) {
      const queryBuilderModel = LocalStorageUtils.getQueryBuilderModel();
      const request = new FilteringQueryRequest(queryBuilderModel);
      getImageByFilters(request, filteringPageableProperties).then((pageableResponse) => {
        if (pageableResponse) {
          // TODO: Put this state into the redux storage.
          setResponse(pageableResponse);
        }
      });
      dispatch(setFilterMenuAction(undefined));
    }
  }, [filterMenuAction, filteringPageableProperties]);

  const handleClickOnImage = (imageEntity: ImageDto) => {
    if (selectedImage) {
      const filteredSelectedImages = selectedImage?.images.filter(
        (properties) => properties.image.id !== imageEntity.id,
      );
      dispatch(
        setSelectedImage({
          ...selectedImage,
          images:
            filteredSelectedImages.length !== selectedImage.images.length
              ? filteredSelectedImages
              : [
                  ...selectedImage.images,
                  {
                    image: imageEntity,
                    width: undefined,
                    height: undefined,
                  },
                ],
        }),
      );
    }
  };

  const isElementPresentInSelectedImages = (imageEntity: ImageDto) =>
    (selectedImage &&
      !!selectedImage.images.find((properties) => properties.image.id === imageEntity.id)) ??
    false;

  return (
    <StyledFilterImageHolder>
      <StyledComponentGap display={"grid"}>
        <StyledCardsHolder gap={"16px"}>
          {response?.pageItems.map((imageEntity, index) => (
            <StyledCard
              key={index}
              id={IdUtils.GetFilteredImageCardDivId(index)}
              is_card_selected={+isElementPresentInSelectedImages(imageEntity)}
              onClick={(event) => {
                handleClickOnImage(imageEntity);
                handleClickOnGlobalRippleEffect(event, IdUtils.GetFilteredImageCardDivId(index));
              }}
            >
              <StyledImageMediaCard imageDto={imageEntity} alt={"Filtered image No."} />
              <CardContent>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    textShadow: "1px 1px 1px black",
                  }}
                >
                  {imageEntity.imageName}
                </Typography>
              </CardContent>
            </StyledCard>
          ))}
        </StyledCardsHolder>
        <Divider />
        <FilteringDialogImageDisplayPagination pageableImages={response} />
      </StyledComponentGap>
    </StyledFilterImageHolder>
  );
};

export default FilteringDialogImageDisplay;

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

const StyledCardsHolder = styled(StyledComponentGap)<{}>((_) => ({
  flexWrap: "wrap",
  justifyContent: "center",
}));

const StyledFilterImageHolder = styled(StyledScrollBarHolder)<{}>((_) => ({
  padding: "8px",
  marginRight: "2px",
}));
