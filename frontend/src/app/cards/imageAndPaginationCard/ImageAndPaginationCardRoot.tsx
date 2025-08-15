import ImageDto from "@model/dto/ImageDto";
import PageableResponse from "@model/response/PageableResponse";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import PageableProperties from "@model/PageableProperties";
import ImageAndPaginationCard from "./ImageAndPaginationCard";
import { MenuActions } from "@model/enum";
import StyledTablePagination from "@components/StyledTablePagination";
import { styled } from "@mui/material/styles";
import { StyledScrollBarHolder } from "@global/globalStyles";

const rowsPerPageOptions = [3, 6, 9, 12, 15];

type Props = {
  content: {
    emptyContentText: string;
    nullResultContentText: string;
  };
  pageableResponse?: PageableResponse<ImageDto>;
  imageActions?: SelectedImageAction[];
  isRippleDisabled?: boolean;
  isMenuDisabled?: boolean;
  setMenuAction: (menuAction?: MenuActions) => void;
  setPageable: (pageable: PageableProperties) => void;
  handleClickOnRippleImage: (imageDto: ImageDto) => void;
};

const ImageAndPaginationCardRoot = ({
  content,
  pageableResponse,
  imageActions = [],
  isRippleDisabled,
  isMenuDisabled,
  setMenuAction,
  setPageable,
  handleClickOnRippleImage,
}: Props) => {
  const handleChangeOfPageable = (pageable: PageableProperties) => {
    setPageable(pageable);
    setMenuAction(MenuActions.PAGINATION_CHANGE);
  };

  return (
    <StyledCardAndPaginationWrapper>
      <StyledTablePagination
        pageNo={pageableResponse?.page ?? 0}
        pageSize={pageableResponse?.size ?? 0}
        totalElements={pageableResponse?.totalElements ?? -1}
        isDisabled={!pageableResponse}
        rowsPerPageOptions={rowsPerPageOptions}
        setPageable={handleChangeOfPageable}
      />
      <ImageAndPaginationCard
        content={content}
        pageableResponse={pageableResponse}
        imageActions={imageActions}
        isRippleDisabled={isRippleDisabled}
        isMenuDisabled={isMenuDisabled}
        handleClickOnRippleImage={handleClickOnRippleImage}
      />
    </StyledCardAndPaginationWrapper>
  );
};

export default ImageAndPaginationCardRoot;

const StyledCardAndPaginationWrapper = styled(StyledScrollBarHolder)({
  height: "100%",
  padding: "8px",
  margin: "0px 2px 2px 0px",
});
