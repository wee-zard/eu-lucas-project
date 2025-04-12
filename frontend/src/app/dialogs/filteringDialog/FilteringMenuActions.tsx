import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import StyledButton from "@components/StyledButton";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { StyledComponentGap } from "@global/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteringPageableProperties,
  setFilterMenuAction,
  setSelectedImageModel,
} from "@redux/actions/imageActions";
import { MenuActions } from "@model/enum";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { selectSelectedImageModel } from "@redux/selectors/imageSelector";
import { FILTERING_PAGE_SIZE } from "@global/globalConsts";

const FilteringMenuActions = () => {
  const selectedImageModel = useSelector(selectSelectedImageModel);
  const dispatch = useDispatch();
  const handleClearAll = () => dispatch(setFilterMenuAction(MenuActions.CLEAR_ALL));
  const handleCancel = () => dispatch(setFilterMenuAction(MenuActions.CANCEL));
  const handleApply = () => {
    if (!selectedImageModel) {
      return;
    }

    dispatch(setFilterMenuAction(MenuActions.SUBMIT));
    dispatch(
      setSelectedImageModel({
        id: selectedImageModel.id,
        images: [],
        query: LocalStorageUtils.getQueryBuilderModel(),
      }),
    );
    dispatch(
      setFilteringPageableProperties({
        pageNo: 0,
        pageSize: FILTERING_PAGE_SIZE,
      }),
    );
  };

  return (
    <StyledMenuActionsHolder>
      <StyledIconButton
        buttonIcon={<ClearAllIcon />}
        tooltip={{
          tooltipTitle: "Clear All Filters",
          tooltipPlacement: "top",
        }}
        onClick={handleClearAll}
      />
      <StyledComponentGap>
        <StyledButton buttonText="Cancel" buttonVariant="outlined" onClick={handleCancel} />
        <StyledButton buttonText="Apply" buttonVariant="outlined" onClick={handleApply} />
      </StyledComponentGap>
    </StyledMenuActionsHolder>
  );
};

export default FilteringMenuActions;

const StyledMenuActionsHolder = styled.div<{}>((_) => ({
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  height: "10%",
}));
