import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import StyledButton from "@components/StyledButton";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { StyledComponentGap } from "@global/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { setFilterMenuAction, setSelectedImage } from "@redux/actions/imageActions";
import { MenuActions } from "@model/enum";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { selectSelectedImage } from "@redux/selectors/imageSelector";

const FilteringMenuActions = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const dispatch = useDispatch();
  const handleClearAll = () => dispatch(setFilterMenuAction(MenuActions.CLEAR_ALL));
  const handleCancel = () => dispatch(setFilterMenuAction(MenuActions.CANCEL));
  const handleApply = () => {
    if (selectedImage) {
      dispatch(setFilterMenuAction(MenuActions.SUBMIT));
      dispatch(
        setSelectedImage({
          id: selectedImage.id,
          images: [],
          query: LocalStorageUtils.getQueryBuilderModel(),
        }),
      );
    }
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
