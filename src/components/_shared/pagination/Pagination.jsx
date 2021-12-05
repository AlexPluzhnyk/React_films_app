import * as React from "react";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./style.scss";

export default function MyPagination({
  currentPage,
  totalPages,
  handleChange,
}) {
  const handlePageChange = (_, newPage) => {
    handleChange(newPage);
  };

  return (
    <div className="pagination">
      <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={totalPages}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
}
