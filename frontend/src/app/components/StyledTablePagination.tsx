import PageableProperties from "@model/PageableProperties";
import TablePagination, { LabelDisplayedRowsArgs } from "@mui/material/TablePagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import i18n from "@i18n/i18nHandler";

type Props = {
  pageNo: number;
  pageSize: number;
  totalElements: number;
  rowsPerPageOptions?: number[];
  isDisabled?: boolean;
  setPageable: (pageable: PageableProperties) => void;
};

const StyledTablePagination = ({
  pageNo,
  pageSize,
  totalElements,
  rowsPerPageOptions,
  isDisabled,
  setPageable,
}: Props) => {
  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPageable({ pageNo: newPage, pageSize });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageable({ pageNo: 0, pageSize: parseInt(event.target.value, 10) });
  };

  const getLabelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
    return count === -1 ? "" : `${from}-${to} of ${count}`;
  };

  return (
    <TablePagination
      component="div"
      count={totalElements}
      page={pageNo}
      rowsPerPage={pageSize}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelDisplayedRows={getLabelDisplayedRows}
      labelRowsPerPage={i18n.t("cards.imageAndPagination.labelRowsPerPage")}
      showFirstButton
      showLastButton
      disabled={isDisabled}
      rowsPerPageOptions={rowsPerPageOptions}
      slots={{ actions: { previousButtonIcon: ChevronLeftIcon, nextButtonIcon: ChevronRightIcon } }}
      sx={{
        "& .MuiToolbar-root": {
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        },
      }}
    />
  );
};

export default StyledTablePagination;
