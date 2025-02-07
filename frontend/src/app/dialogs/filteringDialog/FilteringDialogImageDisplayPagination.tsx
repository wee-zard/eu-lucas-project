import { StyledComponentGap } from "@global/globalStyles";
import { setFilteringPageableProperties, setFilterMenuAction } from "@redux/actions/imageActions";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StyledIconButton from "@components/StyledIconButton";
import { MenuActions } from "@model/enum";

const FilteringDialogImageDisplayPagination = () => {
  const { filteringPageableProperties } = useSelector(selectImageStorage);
  const dispatch = useDispatch();

  const handlePaginationChanges = () =>
    dispatch(setFilterMenuAction(MenuActions.PAGINATION_CHANGE));

  const handleLeftPaginationClick = () => {
    if (filteringPageableProperties.pageNo > 0) {
      handlePaginationChanges();
      dispatch(
        setFilteringPageableProperties({
          ...filteringPageableProperties,
          pageNo: filteringPageableProperties.pageNo - filteringPageableProperties.pageSize,
        }),
      );
    }
  };

  const handleRightPaginationClick = () => {
    handlePaginationChanges();
    dispatch(
      setFilteringPageableProperties({
        ...filteringPageableProperties,
        pageNo: filteringPageableProperties.pageNo + filteringPageableProperties.pageSize,
      }),
    );
  };

  return (
    <StyledComponentGap style={{ justifyContent: "center" }}>
      <StyledIconButton
        buttonIcon={<ChevronLeftIcon />}
        isDisabled={filteringPageableProperties.pageNo === 0}
        onClick={handleLeftPaginationClick}
      />
      <StyledIconButton buttonIcon={<ChevronRightIcon />} onClick={handleRightPaginationClick} />
    </StyledComponentGap>
  );
};

export default FilteringDialogImageDisplayPagination;
