import i18n from "@i18n/i18nHandler";
import { SelectedImageActionTooltipTitles } from "@model/enum";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { setBoundingBoxDialogToOpen } from "@redux/actions/boundingBoxActions";
import { setSelectedImage, setSelectedImagesModel } from "@redux/actions/imageActions";
import ImageDto from "@model/dto/ImageDto";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import SelectedImagesModel from "@model/SelectedImagesModel";

export const useImageActionTooltip = () => {
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  const dispatch = useDispatch();

  const imageActionsObj: SelectedImageAction[] = [
    {
      icon: <DeleteForeverOutlinedIcon color={"error"} />,
      tooltipTitle: i18n.t(SelectedImageActionTooltipTitles.Delete),
      onClick: (imageDto: ImageDto) => {
        const newModel: SelectedImagesModel = {
          ...selectedImagesModel,
          queryImages: selectedImagesModel.queryImages.filter(
            (imagePropertyModel) => imagePropertyModel.image.id !== imageDto.id,
          ),
        };
        dispatch(setSelectedImagesModel(newModel));
      },
    },
    {
      icon: <VisibilityOffIcon />,
      tooltipTitle: i18n.t(SelectedImageActionTooltipTitles.Hide),
      onClick: (imageDto: ImageDto) => {
        const newModel: SelectedImagesModel = {
          ...selectedImagesModel,
          queryImages: selectedImagesModel.queryImages.map((imagePropertyModel) =>
            imagePropertyModel.image.id !== imageDto.id
              ? imagePropertyModel
              : {
                  ...imagePropertyModel,
                  image: {
                    ...imagePropertyModel.image,
                    areBoundingBoxesHidden: !imagePropertyModel.image.areBoundingBoxesHidden,
                  },
                },
          ),
        };
        dispatch(setSelectedImagesModel(newModel));
      },
    },
    {
      icon: <ImageSearchOutlinedIcon />,
      tooltipTitle: i18n.t(SelectedImageActionTooltipTitles.Search),
      onClick: (imageDto: ImageDto) => {
        dispatch(setBoundingBoxDialogToOpen(true));
        dispatch(setSelectedImage(imageDto));
      },
    },
  ];

  return imageActionsObj;
};
