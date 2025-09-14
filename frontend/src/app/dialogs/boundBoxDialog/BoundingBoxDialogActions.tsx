import { imageToFolderCommand } from "@api/command/folderContentCommands";
import StyledButton from "@components/StyledButton";
import i18n from "@i18n/i18nHandler";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import ImageDto from "@model/dto/ImageDto";
import { MenuActions } from "@model/enum";
import SelectedImagesModel from "@model/SelectedImagesModel";
import DialogActions from "@mui/material/DialogActions";
import { setBackgroundBackdropConfig } from "@redux/actions/backgroundActions";
import { setFolderSelectionMenuAction } from "@redux/actions/folderSelectionActions";
import { setSelectedImagesModel } from "@redux/actions/imageActions";
import { selectFolderSelectionFolder } from "@redux/selectors/folderSelectionSelectors";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { selectSelectedListOfProcedureLogs } from "@redux/selectors/procedureLogSelector";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type Props = {
  handleClose: () => void;
};

const BoundingBoxDialogActions = ({ handleClose }: Props) => {
  const selectedLogs = useSelector(selectSelectedListOfProcedureLogs);
  const { selectedImage, selectedImagesModel } = useSelector(selectImageStorage);
  const folder = useSelector(selectFolderSelectionFolder);
  const buttonText = `${i18n.t("components.button.save")}${selectedLogs.length === 0 ? "" : ` (${selectedLogs.length})`}`;
  const dispatch = useDispatch();

  /**
   * Handles the save of the selected procedure logs in which the bounding boxes are present.
   * The bounding boxes will be added and saved on the side of the images on the client's side.
   */
  const handleButtonClick = () => {
    if (!selectedImage) {
      return;
    }

    if (!folder) {
      handleNonFolderImageModelModification(selectedImage);
    } else {
      handleFolderImageModelModification(selectedImage, folder);
    }
  };

  const handleNonFolderImageModelModification = (selectedImage: ImageDto) => {
    const newSelectedImagesModel: SelectedImagesModel = {
      ...selectedImagesModel,
      queryImages: selectedImagesModel.queryImages.map((imageProperties) =>
        imageProperties.image.id === selectedImage.id
          ? {
              ...imageProperties,
              logs: selectedLogs,
            }
          : imageProperties,
      ),
    };

    dispatch(setSelectedImagesModel(newSelectedImagesModel));
    handleClose();
  };

  /**
   * Updates the content of the folder. Removes the old image and their logs and replaces
   * it with the current image and logs.
   * After the update is finished, refreshes the table, so the new images could be displayed
   * on the table view.
   *
   * @param image The image that has been modified
   * @param folder The folder in which the image is present
   */
  const handleFolderImageModelModification = (image: ImageDto, folder: FolderDtoSlice) => {
    dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));
    imageToFolderCommand({
      title: "",
      description: "",
      queriedImages: [
        {
          imageId: image.id,
          logs: selectedLogs.map((model) => ({
            logId: model.log.id,
            properties: Object.entries(model.properties).map((keyValue) => ({
              key: keyValue[0].toString(),
              value: keyValue[1].toString(),
            })),
          })),
        },
      ],
      folderId: folder.id,
    }).then(() => {
      dispatch(setFolderSelectionMenuAction(MenuActions.PAGINATION_CHANGE));
      handleClose();
    });
  };

  return (
    <DialogActions>
      <StyledButton
        buttonText={buttonText}
        isDisabled={selectedLogs.length === 0}
        buttonColor="success"
        buttonVariant="outlined"
        buttonType={"submit"}
        onClick={handleButtonClick}
      />
    </DialogActions>
  );
};

export default BoundingBoxDialogActions;
