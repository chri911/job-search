// src/components/ApplicationsPagination.tsx
import { TablePagination } from "@mui/material";
import { useBreakpoints } from "../hooks/useBreakpoints";

interface Props {
  total: number;
  page: number; // 1-based, как в API
  limit: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (limit: number) => void;
}

export const ApplicationsPagination = ({
  total,
  page,
  limit,
  onPageChange,
  onRowsPerPageChange,
}: Props) => {
  const { isPhone } = useBreakpoints();
  return (
    <TablePagination
      component="div"
      count={total}
      page={page - 1}
      onPageChange={(_, p) => onPageChange(p)}
      rowsPerPage={limit}
      onRowsPerPageChange={(e) =>
        onRowsPerPageChange(parseInt(e.target.value, 10))
      }
      rowsPerPageOptions={isPhone ? [] : [5, 10, 25, 50]}
    />
  );
};
