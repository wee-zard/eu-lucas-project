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
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { setFilterMenuAction, setSelectedImage } from "@redux/actions/imageActions";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilteringDialogImageDisplayPagination from "@dialogs/filteringDialog/FilteringDialogImageDisplayPagination";
import { handleClickOnGlobalRippleEffect } from "@global/globalMethods";
import { StyledCardTemplate } from "@screens/filteringScreen/FilteringCommonStyledComponents";

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
          setResponse(pageableResponse);
        }
      });
      dispatch(setFilterMenuAction(undefined));
    }
  }, [filterMenuAction, filteringPageableProperties]);

  const handleRenderOfEmptyBody = () => {
    return !response ? (
      <StyledEmptyBody>Szűrési feltétel még nem kerül megadásra!</StyledEmptyBody>
    ) : response?.pageItems.length === 0 ? (
      <StyledEmptyBody>A megadott szűrési feltétel üres eredményt adott vissza!</StyledEmptyBody>
    ) : null;
  };

  const handleClickOnImage = (imageEntity: ImageDto) => {
    if (selectedImage) {
      const filteredSelectedImages = selectedImage?.images.filter(
        (image) => image.id !== imageEntity.id,
      );
      dispatch(
        setSelectedImage({
          ...selectedImage,
          images:
            filteredSelectedImages.length !== selectedImage.images.length
              ? filteredSelectedImages
              : [...selectedImage.images, imageEntity],
        }),
      );
    }
  };

  const isElementPresentInSelectedImages = (imageEntity: ImageDto) =>
    (selectedImage && !!selectedImage.images.find((image) => image.id === imageEntity.id)) ?? false;

  return (
    <StyledFilterImageHolder>
      {!response || response?.pageItems.length === 0 ? (
        handleRenderOfEmptyBody()
      ) : (
        <StyledComponentGap display={"grid"}>
          <StyledCardsHolder gap={"16px"}>
            {response?.pageItems.map((imageEntity, index) => (
              <StyledCard
                key={index}
                id={IdUtils.GetFilteredImageCardDivId(index)}
                $isCardSelected={isElementPresentInSelectedImages(imageEntity)}
                onClick={(event) => {
                  handleClickOnImage(imageEntity);
                  handleClickOnGlobalRippleEffect(event, IdUtils.GetFilteredImageCardDivId(index));
                }}
              >
                <CardMedia
                  component="img"
                  image={getImageFromRemoteServer(imageEntity)}
                  alt={`Filtered image No.${index}`}
                  sx={{ borderRadius: "8px" }}
                />
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
          <FilteringDialogImageDisplayPagination />
        </StyledComponentGap>
      )}
    </StyledFilterImageHolder>
  );
};

export default FilteringDialogImageDisplay;

export const getImageFromRemoteServer = (obj: ImageDto) => {
  const remoteUrl = "https://gisco-services.ec.europa.eu/lucas/photos";
  const x =
    obj.coordinateX < 10
      ? `00${obj.coordinateX}`
      : obj.coordinateX < 100
        ? `0${obj.coordinateX}`
        : obj.coordinateX;

  const y =
    obj.coordinateY < 10
      ? `00${obj.coordinateY}`
      : obj.coordinateY < 100
        ? `0${obj.coordinateY}`
        : obj.coordinateY;
  return `${remoteUrl}/${obj.year}/${obj.country}/${x}/${y}/${obj.imageName}`;
};

const StyledCard = styled(StyledCardTemplate)<{ $isCardSelected: boolean }>((props) => ({
  "&.MuiPaper-root": {
    background: props.$isCardSelected
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

const StyledEmptyBody = styled.div<{}>((_) => ({
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic",
  fontWeight: "bold",
}));

const StyledFilterImageHolder = styled(StyledScrollBarHolder)<{}>((_) => ({
  padding: "8px",
  marginRight: "2px",
}));
