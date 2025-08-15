import { useDispatch, useSelector } from "react-redux";
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
} from "@dialogs/filteringDialog/FilteringDialog";
import i18n from "@i18n/i18nHandler";
import BoundingBoxDialogContent from "./BoundingBoxDialogContent";
import { setProcedureLogStorageToDefault } from "@redux/actions/procedureLogActions";
import { setSelectedImage } from "@redux/actions/imageActions";
import { setBoundingBoxDialogToOpen } from "@redux/actions/boundingBoxActions";
import { selectIsBoundingBoxDialogOpen } from "@redux/selectors/boundingBoxSelector";

const BoundingBoxDialog = () => {
  const isDialogOpen = useSelector(selectIsBoundingBoxDialogOpen);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setBoundingBoxDialogToOpen(false));
    dispatch(setSelectedImage(undefined));
    dispatch(setProcedureLogStorageToDefault());
  };

  return (
    <StyledDialog open={isDialogOpen} onClose={handleDialogClose}>
      <StyledDialogTitle>{i18n.t("screens.bounding-box.dialog-title")}</StyledDialogTitle>
      <StyledDialogContent>
        <BoundingBoxDialogContent />
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default BoundingBoxDialog;
