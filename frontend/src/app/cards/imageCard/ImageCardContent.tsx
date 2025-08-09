import React from "react";
import { CardContent, Menu } from "@mui/material";
import ImageDto from "@model/dto/ImageDto";
import styled from "@emotion/styled";
import { StyledTypography } from "@screens/filteringScreen/FilteringCommonStyledComponents";
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
  setSelectedImageModel,
} from "@redux/actions/imageActions";
import { useSelector } from "react-redux";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import StyledZoomMap from "@components/StyledZoomMap";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import { GenericHandlerType } from "@model/types/GenericHandlerType";

type Props = {
  imageDto: ImageDto;
  imageModel: SelectedImagesModel;
};

const ImageCardContent = ({ imageDto, imageModel }: Props) => {
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const imageMenuProperties = {
    paper: {
      style: {
        height: 36 * 4.5,
        width: "10ch",
        background: "#00000060",
        borderRadius: "16px",
      },
    },
  };

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
    const handler: GenericHandlerType<SelectedImageActionTooltipTitles, () => void> = {
      [SelectedImageActionTooltipTitles.Search]: () => {
        dispatch(setDialogToOpen(DialogToOpens.BoundingBoxDialog));
        dispatch(setSelectedImage(imageDto));
      },
      [SelectedImageActionTooltipTitles.Edit]: () => {
        dispatch(setDialogToOpen(DialogToOpens.FilteringDialog));
        dispatch(setSelectedImageModel(imageModel));
        // With this, the filtered images by the query builder on the FilterDialog will be displayed.
        dispatch(setFilterMenuAction(MenuActions.SUBMIT));
        LocalStorageUtils.setQueryBuilderModelLocalStorage(imageModel.query);
      },
      [SelectedImageActionTooltipTitles.Delete]: () => {
        const updateListOfSelectedImages = listOfSelectedImages
          .map((model) => ({
            ...model,
            images:
              model.id === imageModel.id
                ? imageModel.images.filter((properties) => properties.image.id !== imageDto.id)
                : model.images,
          }))
          .filter((item) => item.images.length > 0);
        dispatch(setListOfSelectedImages(updateListOfSelectedImages));
      },
    };
    handler[title]();
    handleClose();
  };

  return (
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
          slotProps={imageMenuProperties}
        >
          <StyledImageActionsHolder>
            {imageActionsObj.map((imageActionObj, index) => (
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
  );
};

export default ImageCardContent;

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
