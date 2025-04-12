import { useDispatch, useSelector } from "react-redux";
import { setDialogToOpen } from "@redux/actions/dialogActions";
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
} from "@dialogs/filteringDialog/FilteringDialog";
import i18n from "@i18n/i18nHandler";
import BoundingBoxDialogContent from "./BoundingBoxDialogContent";
import { selectIsDialogOpen } from "@redux/selectors/dialogSelector";
import { RootState } from "@redux/store";
import { DialogToOpens } from "@model/enum";
import { setProcedureLogStorageToDefault } from "@redux/actions/procedureLogActions";
import { setSelectedImage } from "@redux/actions/imageActions";

const BoundingBoxDialog = () => {
  const isDialogOpen = useSelector((state) =>
    selectIsDialogOpen(state as RootState, DialogToOpens.BoundingBoxDialog),
  );
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setDialogToOpen());
    dispatch(setSelectedImage());
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
