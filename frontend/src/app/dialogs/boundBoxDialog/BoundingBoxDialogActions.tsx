import StyledButton from "@components/StyledButton";
import i18n from "@i18n/i18nHandler";
import SelectedImagesModel from "@model/SelectedImagesModel";
import DialogActions from "@mui/material/DialogActions";
import { setSelectedImagesModel } from "@redux/actions/imageActions";
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

    const newSelectedImagesModel: SelectedImagesModel = {
      ...selectedImagesModel,
      queryImages: selectedImagesModel.queryImages.map((imageProperties) =>
        imageProperties.image.id === selectedImage.id
          ? {
              ...imageProperties,
              boundingBoxes: selectedLogs,
            }
          : imageProperties,
      ),
    };

    // TODO: If a "folder" has been opened by the user, then save the bounding box in the folder.
    // TODO: Do not forget to reset the images on the table (where the images are displayed)
    dispatch(setSelectedImagesModel(newSelectedImagesModel));
    handleClose();
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
