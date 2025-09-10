import { StyledComponentGap } from "@global/globalStyles";
import FilteringScreenBody from "@screens/filteringScreen/body/FilteringScreenBody";
import FilteringScreenHeader from "@screens/filteringScreen/FilteringScreenHeader";
import FilteringDialog from "@dialogs/filteringDialog/FilteringDialog";
import BoundingBoxDialog from "@dialogs/boundBoxDialog/BoundingBoxDialog";
import FolderCreationDialog from "@screens/manageFoldersScreen/dialog/folderCreation/FolderCreationDialog";
import ImageToFolderAdditionDialog from "@screens/manageFoldersScreen/dialog/imageToFolderAddition/ImageToFolderAdditionDialog";

const FilteringScreen = () => {
  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <FilteringScreenHeader />
      <FilteringScreenBody />
      <FilteringDialog />
      <BoundingBoxDialog />
      <FolderCreationDialog />
      <ImageToFolderAdditionDialog />
    </StyledComponentGap>
  );
};

export default FilteringScreen;
