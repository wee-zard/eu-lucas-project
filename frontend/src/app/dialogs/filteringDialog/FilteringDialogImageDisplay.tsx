import { getImageByFilters } from "@api/command/imageCommand";
import styled from "@emotion/styled";
import { StyledComponentGap, StyledScrollBarHolder } from "@global/globalStyles";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import ImageDto from "@model/dto/ImageDto";
import { MenuActions } from "@model/enum";
import PageableProperties from "@model/PageableProperties";
import FilteringQueryRequest from "@model/request/FilteringQueryRequest";
import PageableResponse from "@model/response/PageableResponse";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { setFilterMenuAction } from "@redux/actions/imageActions";
import { selectFilterMenuActions } from "@redux/selectors/imageSelector";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const FilteringDialogImageDisplay = () => {
  const filterMenuAction = useSelector(selectFilterMenuActions);
  const [response, setResponse] = useState<PageableResponse<ImageDto>>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterMenuAction === MenuActions.SUBMIT) {
      const queryBuilderModel = LocalStorageUtils.getQueryBuilderModel();
      const pageableProperties: PageableProperties = new PageableProperties(0, 10); // FIXME: This needs to be dynamic.
      const request: FilteringQueryRequest = new FilteringQueryRequest(queryBuilderModel);
      getImageByFilters(request, pageableProperties).then((pageableResponse) => {
        console.log("Response", pageableResponse);
      });
      dispatch(setFilterMenuAction());
    }
  }, [filterMenuAction])

  return (
    <div>
    <StyledScrollBarHolder>
      {response?.pageItems.length === 0 ? (
        <StyledEmptyBody>Nincsen még kép kiválasztva!</StyledEmptyBody>
      ) : (
        <StyledCardsHolder style={{}}>
          {response?.pageItems.map((imageEntity, index) => (
            <Card
              key={index}
              sx={{ 
                "&.MuiPaper-root": {
                  width: 250
                }
               }}
            >
              <CardMedia
                component="img"
                image={`https://gisco-services.ec.europa.eu/lucas/photos/${imageEntity.year}/${imageEntity.country}/${imageEntity.coordinateX}/${imageEntity.coordinateY}/${imageEntity.imageName}`}
                alt="Remote image"
              />
              <CardContent>
                <Typography gutterBottom component="div">
                  {imageEntity.imageName}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </StyledCardsHolder>
      )}
    </StyledScrollBarHolder>
    </div>
  );
};

export default FilteringDialogImageDisplay;

const StyledCardsHolder = styled(StyledComponentGap)<{}>((props) => ({
  flexWrap: "wrap",
}));

const StyledEmptyBody = styled.div<{}>((props) => ({
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic",
  fontWeight: "bold",
}));
