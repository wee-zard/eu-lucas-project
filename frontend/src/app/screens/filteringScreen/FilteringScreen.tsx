import { StyledComponentGap } from "@global/globalStyles";
import FilteringScreenBody from "@screens/filteringScreen/FilteringScreenBody";
import FilteringScreenHeader from "@screens/filteringScreen/FilteringScreenHeader";
import FilteringDialog from "@dialogs/filteringDialog/FilteringDialog";
import BoundingBoxDialog from "@dialogs/boundBoxDialog/BoundingBoxDialog";
import FolderCreationDialog from "@dialogs/folderCreationDialog/FolderCreationDialog";

const FilteringScreen = () => {
  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <FilteringScreenHeader />
      <FilteringScreenBody />
      <FilteringDialog />
      <BoundingBoxDialog />
      <FolderCreationDialog />
    </StyledComponentGap>
  );
};

export default FilteringScreen;
