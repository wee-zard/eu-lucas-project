import { StyledComponentGap } from "@global/globalStyles";
import { setFilteringPageableProperties, setFilterMenuAction } from "@redux/actions/imageActions";
import { selectImageStorage } from "@redux/selectors/imageSelector";
import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StyledIconButton from "@components/StyledIconButton";
import { MenuActions } from "@model/enum";
import PageableResponse from "@model/response/PageableResponse";
import ImageDto from "@model/dto/ImageDto";
import { styled } from "@mui/material";

type Props = {
  pageableImages?: PageableResponse<ImageDto>;
};

const FilteringDialogImageDisplayPagination = ({ pageableImages }: Props) => {
  const { filteringPageableProperties } = useSelector(selectImageStorage);
  const currentPageNo = Math.floor(filteringPageableProperties.pageNo / 10) + 1;
  const dispatch = useDispatch();

  const handlePaginationChanges = () =>
    dispatch(setFilterMenuAction(MenuActions.PAGINATION_CHANGE));

  const handleLeftPaginationClick = () => {
    if (filteringPageableProperties.pageNo <= 0) {
      return;
    }

    handlePaginationChanges();
    dispatch(
      setFilteringPageableProperties({
        ...filteringPageableProperties,
        pageNo: filteringPageableProperties.pageNo - filteringPageableProperties.pageSize,
      }),
    );
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
    <StyledPaginationHolder>
      <StyledIconButton
        buttonIcon={<ChevronLeftIcon />}
        isDisabled={filteringPageableProperties.pageNo === 0}
        onClick={handleLeftPaginationClick}
      />
      <div>{currentPageNo}</div>
      <StyledIconButton
        buttonIcon={<ChevronRightIcon />}
        isDisabled={!pageableImages || pageableImages.pageItems.length < 9}
        onClick={handleRightPaginationClick}
      />
    </StyledPaginationHolder>
  );
};

export default FilteringDialogImageDisplayPagination;

const StyledPaginationHolder = styled(StyledComponentGap)<{}>((_) => ({
  justifyContent: "center",
  alignItems: "center",
}));
