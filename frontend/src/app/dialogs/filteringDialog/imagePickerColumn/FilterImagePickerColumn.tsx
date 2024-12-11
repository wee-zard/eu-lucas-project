import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { StyledComponentGap, StyledScrollBarHolder, windowBorders } from "../../../global/globalStyles";
import { useSelector } from "react-redux";
import { selectFilterFormDataGrid } from "../../../redux/selectors/imageSelector";
import { filterImageByFilters } from "../../../api/command/imageCommand";
import PageableResponse from "../../../model/response/PageableResponse";
import ImageDto from "../../../model/dto/ImageDto";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

const FilterImagePickerColumn = () => {
  const [response, setResponse] = useState<PageableResponse<ImageDto>>();
  const [imageResponse, setImageResponse] = useState<{id: number, image: string}[]>();
  const filterFormDataGrid = useSelector(selectFilterFormDataGrid);

  useEffect(() => {
    if (filterFormDataGrid.filterComponents.length > 0) {
      filterImageByFilters(filterFormDataGrid).then((res) => {
        if (res) {
          setResponse(res);
        }
      });
    }
  }, [filterFormDataGrid]);

  return (
    <StyledDialogColumnHolder>

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

    </StyledDialogColumnHolder>
  );
};

export default FilterImagePickerColumn;

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  ...windowBorders(),
  width: "100%",
  height: "100%",
  gap: "16px",
  display: "flex",
  flexDirection: "column"
}));

const StyledCardsHolder = styled(StyledComponentGap)<{}>((props) => ({
  flexWrap: "wrap",
}));

const StyledEmptyBody = styled.div<{}>((props) => ({
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic",
  fontWeight: "bold",
}));

