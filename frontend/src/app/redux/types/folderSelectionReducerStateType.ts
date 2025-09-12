import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import { MenuActions } from "@model/enum";
import PageableResponse from "@model/response/PageableResponse";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";

interface FolderSelectionReducerStateType {
  isOpen: boolean;
  folder?: FolderDtoSlice;
  response?: PageableResponse<QueriedImagePropertyType>;
  menuAction?: MenuActions;
}

export default FolderSelectionReducerStateType;
