import { useSelector } from "react-redux";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import i18n from "@i18n/i18nHandler";
import StyledAlert from "@components/StyledAlert";
import AlertTitleEnum from "@model/enum/AlertTitleEnum";

const FilteringScreenImageAlert = () => {
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  return (
    <>
      {selectedImagesModel.queryImages.length > 0 && (
        <StyledAlert
          severity={"warning"}
          variant={"filled"}
          message={i18n.t("screens.filtering.alert.images-not-saved-in-folder")}
          alertTitle={i18n.t(AlertTitleEnum.WARNING)}
        />
      )}
    </>
  );
};

export default FilteringScreenImageAlert;
