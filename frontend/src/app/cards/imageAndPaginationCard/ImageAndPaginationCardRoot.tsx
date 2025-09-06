import ImageDto from "@model/dto/ImageDto";
import PageableResponse from "@model/response/PageableResponse";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import PageableProperties from "@model/PageableProperties";
import ImageAndPaginationCard from "./ImageAndPaginationCard";
import { MenuActions } from "@model/enum";
import StyledTablePagination from "@components/StyledTablePagination";
import { styled } from "@mui/material/styles";
import { StyledScrollBarHolder } from "@global/globalStyles";
import EventListenerType from "@model/types/EventListenerType";
import { useEffect, useState } from "react";
import { handlePageableImageResponseSrcModification } from "@dialogs/filteringDialog/helper/FilteringHelper";

const rowsPerPageOptions = [3, 6, 9, 12, 15];

type Props = {
  event?: EventListenerType;
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
  event,
  content,
  pageableResponse,
  imageActions = [],
  isRippleDisabled,
  isMenuDisabled,
  setMenuAction,
  setPageable,
  handleClickOnRippleImage,
}: Props) => {
  const [response, setResponse] = useState<PageableResponse<ImageDto>>();

  useEffect(() => {
    setResponse(undefined);

    if (!pageableResponse?.content) {
      return;
    }

    handlePageableImageResponseSrcModification(pageableResponse.content)
      .then((imageDtoList) =>
        setResponse({
          ...pageableResponse,
          content: imageDtoList,
        }),
      )
      .catch(() => setResponse(undefined));
  }, [pageableResponse]);

  const handleChangeOfPageable = (pageable: PageableProperties) => {
    setPageable(pageable);
    setMenuAction(MenuActions.PAGINATION_CHANGE);
  };

  return (
    <StyledCardAndPaginationWrapper>
      <StyledTablePagination
        pageNo={response?.page ?? 0}
        pageSize={response?.size ?? 0}
        totalElements={response?.totalElements ?? -1}
        isDisabled={!response}
        rowsPerPageOptions={rowsPerPageOptions}
        setPageable={handleChangeOfPageable}
      />
      <ImageAndPaginationCard
        event={event}
        content={content}
        pageableResponse={response}
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
