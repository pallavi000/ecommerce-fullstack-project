import React from "react";

//mui
import { Pagination, PaginationItem, Button } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

//component prop types
type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange:
    | ((event: React.ChangeEvent<unknown>, page: number) => void)
    | undefined;
};

function CustomPagination({
  currentPage,
  totalPages,
  handlePageChange,
}: CustomPaginationProps) {
  return (
    <Pagination
      showFirstButton
      showLastButton
      shape="rounded"
      sx={{ float: "right" }}
      count={totalPages}
      color="primary"
      page={currentPage}
      onChange={handlePageChange}
      renderItem={(item) => (
        <PaginationItem
          components={{
            previous: PrevPaginationButtonElement,
            next: NextPaginationButtonElement,
          }}
          {...item}
        />
      )}
    />
  );
}

const PrevPaginationButtonElement = () => (
  <Button size="small" variant="contained" startIcon={<ArrowLeft />}>
    Prev
  </Button>
);
const NextPaginationButtonElement = () => (
  <Button size="small" variant="contained" endIcon={<ArrowRight />}>
    Next
  </Button>
);

export default CustomPagination;
