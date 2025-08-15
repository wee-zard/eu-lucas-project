import styled from "@emotion/styled";
import ImageDto from "@model/dto/ImageDto";
import CardContent from "@mui/material/CardContent";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledTypography } from "@screens/filteringScreen/FilteringCommonStyledComponents";
import StyledIconButton from "@components/StyledIconButton";
import { useState } from "react";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import StyledZoomMap from "@components/StyledZoomMap";
import { PopoverOrigin } from "@mui/material";

type Props = {
  imageDto: ImageDto;
  imageActions: SelectedImageAction[];
  isMenuDisabled?: boolean;
};

const anchorOrigin: PopoverOrigin = { vertical: "top", horizontal: "center" };
const transformOrigin: PopoverOrigin = { vertical: "bottom", horizontal: "center" };
const imageMenuProperties = {
  paper: {
    style: {
      width: "10ch",
      background: "#00000095",
      borderRadius: "16px",
    },
  },
};

const ImageAndPaginationCardContent = ({ imageDto, imageActions, isMenuDisabled }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledCardContent>
      <StyledTypography>{imageDto.imageName}</StyledTypography>
      {!isMenuDisabled && (
        <div>
          <StyledIconButton buttonIcon={<MoreVertIcon />} onClick={handleClick} />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            slotProps={imageMenuProperties}
          >
            <StyledImageActionsHolder className="flex-gap16">
              {imageActions.map((imageActionObj, index) => (
                <StyledZoomMap
                  key={imageActionObj.tooltipTitle}
                  index={index}
                  children={
                    <StyledIconButtonHolder>
                      <StyledIconButton
                        buttonIcon={imageActionObj.icon}
                        tooltip={{
                          tooltipTitle: imageActionObj.tooltipTitle,
                          tooltipPlacement: "left-start",
                        }}
                        onClick={() => {
                          imageActionObj.onClick(imageDto);
                          handleClose();
                        }}
                      />
                    </StyledIconButtonHolder>
                  }
                />
              ))}
            </StyledImageActionsHolder>
          </Menu>
        </div>
      )}
    </StyledCardContent>
  );
};

export default ImageAndPaginationCardContent;

const StyledCardContent = styled(CardContent)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const StyledImageActionsHolder = styled.div({
  display: "flex",
  gap: "8px",
  flexDirection: "column-reverse",
});

const StyledIconButtonHolder = styled.div({
  display: "flex",
  justifyContent: "center",
});
