import { DialogActions } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { setSelectedImagesModel } from "@redux/actions/imageActions";
import { StyledComponentGap } from "@global/globalStyles";
import StyledButton from "@components/StyledButton";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import SelectedImagesModel from "@model/SelectedImagesModel";
import i18n from "@i18n/i18nHandler";

type Props = {
  handleDialogClose: () => void;
};

const FilteringDialogActions = ({ handleDialogClose }: Props) => {
  const { selectedImagesModel, queriedImageModel } = useSelector(selectImageStorage);
  const queriedImageLength = Number(queriedImageModel?.images.length);
  const isAgreeButtonDisabled = queriedImageLength === 0;
  const dispatch = useDispatch();

  const agreeButtonText = `${i18n.t("components.button.save")}${
    queriedImageLength > 0 ? ` (${queriedImageModel?.images.length})` : ""
  }`;

  const handleAgreeButtonClick = () => {
    if (!queriedImageModel) {
      return;
    }

    const newSelectedImagesModel: SelectedImagesModel = {
      ...selectedImagesModel,
      queryImages:
        selectedImagesModel.queryImages.length === 0
          ? queriedImageModel.images
          : [
              ...selectedImagesModel.queryImages,
              ...queriedImageModel.images.filter(
                (imageProperties) =>
                  !selectedImagesModel.queryImages.find(
                    (model) => model.image.id === imageProperties.image.id,
                  ),
              ),
            ],
    };

    dispatch(setSelectedImagesModel(newSelectedImagesModel));
    LocalStorageUtils.initQueryBuilderModelLocalStorage();
    handleDialogClose();
  };

  return (
    <StyledDialogActions>
      <StyledActionWrapper>
        <StyledButton
          buttonText={i18n.t("components.button.cancel")}
          buttonColor="error"
          buttonVariant="outlined"
          onClick={handleDialogClose}
        />
        <StyledButton
          buttonText={agreeButtonText}
          isDisabled={isAgreeButtonDisabled}
          buttonColor="success"
          buttonVariant="outlined"
          buttonType={"submit"}
          onClick={handleAgreeButtonClick}
        />
      </StyledActionWrapper>
    </StyledDialogActions>
  );
};

export default FilteringDialogActions;

const StyledActionWrapper = styled(StyledComponentGap)({
  paddingTop: 8,
});

const StyledDialogActions = styled(DialogActions)({
  padding: "0px",
});
