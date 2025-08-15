import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import StyledButton from "@components/StyledButton";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { StyledComponentGap } from "@global/globalStyles";
import { useDispatch } from "react-redux";
import {
  setFilteringPageableProperties,
  setFilterMenuAction,
  setQueriedImageModel,
} from "@redux/actions/imageActions";
import { MenuActions } from "@model/enum";
import i18n from "@i18n/i18nHandler";
import { defaultFilteringPaginationModel } from "@screens/filteringScreen/helper/FilteringHelper";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { useSelector } from "react-redux";
import { selectQueriedImageModel } from "@redux/selectors/imageSelector";

const FilteringMenuActions = () => {
  const queriedImageModel = useSelector(selectQueriedImageModel);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(setFilterMenuAction(MenuActions.CLEAR_ALL));
  };

  // TODO: Maybe it is not a good idea to send out this action, as it could re-render the body of the dialog.
  const handleCancel = () => {
    dispatch(setFilterMenuAction(MenuActions.CANCEL));
  };

  const handleApply = (): void => {
    if (!queriedImageModel) {
      return;
    }

    dispatch(setFilterMenuAction(MenuActions.SUBMIT));
    dispatch(
      setQueriedImageModel({
        images: [],
        query: LocalStorageUtils.getQueryBuilderModel(),
      }),
    );
    dispatch(setFilteringPageableProperties(defaultFilteringPaginationModel));
  };

  return (
    <StyledMenuActionsHolder>
      <StyledIconButton
        buttonIcon={<ClearAllIcon />}
        tooltip={{
          tooltipTitle: i18n.t("screens.filtering.clear-all-filter"),
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

const StyledMenuActionsHolder = styled.div({
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  height: "10%",
});
