import React from "react";
import { CardContent, Menu } from "@mui/material";
import ImageDto from "@model/dto/ImageDto";
import styled from "@emotion/styled";
import {
  StyledCardTemplate,
  StyledTypography,
} from "@screens/filteringScreen/FilteringCommonStyledComponents";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledIconButton from "@components/StyledIconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import { DialogToOpens, MenuActions, SelectedImageActionTooltipTitles } from "@model/enum";
import { useDispatch } from "react-redux";
import { setDialogToOpen } from "@redux/actions/dialogActions";
import SelectedImagesModel from "@model/SelectedImagesModel";
import {
  setFilterMenuAction,
  setListOfSelectedImages,
  setSelectedImage,
} from "@redux/actions/imageActions";
import { useSelector } from "react-redux";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { NotificationSeverity, throwNotification } from "@helper/notificationUtil";
import StyledZoomMap from "@components/StyledZoomMap";
import StyledImageMediaCard from "@cards/StyledImageMediaCard";

type Props = {
  imageDto: ImageDto;
  imageModel: SelectedImagesModel;
};

type SelectedImageAction = {
  icon: any;
  tooltipTitle: SelectedImageActionTooltipTitles;
};

const ImageCard = ({ imageDto, imageModel }: Props) => {
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const imageActionsObj: SelectedImageAction[] = [
    {
      icon: <DeleteForeverOutlinedIcon color={"error"} />,
      tooltipTitle: SelectedImageActionTooltipTitles.Delete,
    },
    {
      icon: <EditOutlinedIcon />,
      tooltipTitle: SelectedImageActionTooltipTitles.Edit,
    },
    {
      icon: <ImageSearchOutlinedIcon />,
      tooltipTitle: SelectedImageActionTooltipTitles.Search,
    },
  ];

  const handleClickOnImageAction = (title: SelectedImageActionTooltipTitles) => {
    const handler = Object.freeze({
      // TODO: A befoglaló téglalapok itt lesz implementálva egy dialógus ablak meghívásával.
      [SelectedImageActionTooltipTitles.Search]: () =>
        throwNotification(
          NotificationSeverity.Info,
          "A befoglaló téglalapok megjelenítése itt lesz implementálva...",
        ),
      [SelectedImageActionTooltipTitles.Edit]: () => {
        dispatch(setDialogToOpen(DialogToOpens.FilteringDialog));
        dispatch(setSelectedImage(imageModel));
        // With this, the filtered images by the query builder on the FilterDialog will be displayed.
        dispatch(setFilterMenuAction(MenuActions.SUBMIT));
        LocalStorageUtils.setQueryBuilderModelLocalStorage(imageModel.query);
      },
      [SelectedImageActionTooltipTitles.Delete]: () => {
        dispatch(
          setListOfSelectedImages(
            listOfSelectedImages.map((model) => ({
              ...model,
              images:
                model.id === imageModel.id
                  ? imageModel.images.filter((properties) => properties.image.id !== imageDto.id)
                  : model.images,
            })),
          ),
        );
      },
    });
    handler[title].call(() => null);
    handleClose();
  };

  return (
    <StyledCardTemplate>
      <StyledImageMediaCard imageDto={imageDto} alt={"Filtered image No."} />
      <StyledPoint />
      <StyledCardContent>
        <StyledTypography>{imageDto.imageName}</StyledTypography>
        <div>
          <StyledIconButton buttonIcon={<MoreVertIcon />} onClick={handleClick} />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            slotProps={{
              paper: {
                style: {
                  height: 36 * 4.5,
                  width: "10ch",
                  background: "#00000060",
                  borderRadius: "16px",
                },
              },
            }}
          >
            <StyledImageActionsHolder>
              {imageActionsObj.map((imageActionObj, index) => (
                <StyledZoomMap
                  key={index}
                  index={index}
                  children={
                    <StyledIconButtonHolder>
                      <StyledIconButton
                        buttonIcon={imageActionObj.icon}
                        tooltip={{
                          tooltipTitle: imageActionObj.tooltipTitle,
                          tooltipPlacement: "left-start",
                        }}
                        onClick={() => handleClickOnImageAction(imageActionObj.tooltipTitle)}
                      />
                    </StyledIconButtonHolder>
                  }
                />
              ))}
            </StyledImageActionsHolder>
          </Menu>
        </div>
      </StyledCardContent>
    </StyledCardTemplate>
  );
};

export default ImageCard;

const StyledPoint = styled.div<{}>((_) => ({
  height: "4px",
  width: "4px",
  backgroundColor: "green",
  position: "relative",
  left: "-2px",
  top: "-2px",
}));

const StyledCardContent = styled(CardContent)<{}>((_) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const StyledIconButtonHolder = styled.div<{}>((_) => ({
  display: "flex",
  justifyContent: "center",
}));

const StyledImageActionsHolder = styled.div<{}>((_) => ({
  display: "flex",
  gap: "8px",
  flexDirection: "column-reverse",
}));
