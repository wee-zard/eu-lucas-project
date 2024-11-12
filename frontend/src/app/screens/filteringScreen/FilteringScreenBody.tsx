import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { StyledComponentGap } from "../../global/globalStyles";
import { useSelector } from "react-redux";
import { selectSelectedImages } from "../../redux/selectors/imageSelector";

const FilteringScreenBody = () => {
  const numberOfCards = useSelector(selectSelectedImages);

  // https://mui.com/material-ui/react-timeline/ 

  return (
    <div>
      {numberOfCards.length === 0 ? (
        <StyledEmptyBody>Nincsen még kép kiválasztva!</StyledEmptyBody>
      ) : (
        <StyledCardsHolder>
          {numberOfCards.map((_, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                minWidth: 300,
                "& .MuiCardContent-root": {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                },
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Image name
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <div>Year: 2024</div>
                  <div>Country: Hungary</div>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </StyledCardsHolder>
      )}
    </div>
  );
};

export default FilteringScreenBody;

const StyledCardsHolder = styled(StyledComponentGap)<{}>((props) => ({
  flexWrap: "wrap",
}));

const StyledEmptyBody = styled.div<{}>((props) => ({
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic",
  fontWeight: "bold",
}));
