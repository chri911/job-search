import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Box,
  Typography,
  Alert,
  Skeleton,
  TableSortLabel,
} from "@mui/material";
import type { Application } from "../types";
import { StatusChip } from "./StatusChip";
import { CompanyAvatar } from "./CompanyAvatar";
import { RowActionsMenu } from "./RowActionsMenu";
import { useNavigate } from "react-router-dom";
import { formatDate, locationLabel } from "../utils/applicationFormat";
import { ApplicationsPagination } from "./ApplicationPagination";

interface ApplicationsTableProps {
  applications: Application[];
  isLoading?: boolean;
  isError?: boolean;
  total: number;
  page: number;
  limit: number;
  sortField: string;
  sortDirection: "asc" | "desc";
  onEditClick: (application: Application) => void;
  onDeleteClick: (application: Application) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (limit: number) => void;
  onSortChange: (field: string) => void;
}

const ROW_HEIGHT = 72;

const sortableColumns: { field: string; label: string }[] = [
  { field: "company", label: "Company" },
  { field: "position", label: "Position" },
  { field: "status", label: "Status" },
  { field: "appliedAt", label: "Applied" },
];

export const ApplicationsTable = ({
  applications,
  isLoading,
  isError,
  total,
  page,
  limit,
  sortField,
  sortDirection,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  onEditClick,
  onDeleteClick,
}: ApplicationsTableProps) => {
  const navigate = useNavigate();

  if (isError) {
    return <Alert severity="error">Failed to load applications</Alert>;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          minWidth: 760,
        }}
      >
        <Table sx={{ minWidth: 760 }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "text.secondary",
                  fontSize: 13,
                  borderColor: "divider",
                },
              }}
            >
              {sortableColumns.map((col) => (
                <TableCell key={col.field}>
                  <TableSortLabel
                    active={sortField === col.field}
                    direction={sortField === col.field ? sortDirection : "asc"}
                    onClick={() => onSortChange(col.field)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Next step</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} sx={{ height: ROW_HEIGHT }}>
                  <TableCell colSpan={5}>
                    <Skeleton variant="text" height={40} />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              applications?.map((app) => (
                <TableRow
                  key={app.id}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                    "&:last-child td": { borderBottom: 0 },
                    "& td": { borderColor: "divider" },
                    height: ROW_HEIGHT,
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <CompanyAvatar company={app.company} />
                      <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                        {app.company}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                      {app.position}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                      {locationLabel(app)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <StatusChip status={app.status} />
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontSize: 14 }}>
                      {formatDate(app.appliedAt)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                      {app.nextStep ?? "—"}
                      {app.nextStepDate && ` · ${formatDate(app.nextStepDate)}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <RowActionsMenu
                      onEdit={() => onEditClick(app)}
                      onDelete={() => onDeleteClick(app)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && applications?.length === 0 && (
              <TableRow sx={{ height: ROW_HEIGHT * 4 }}>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ py: 4, color: "text.secondary" }}
                >
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ApplicationsPagination
        total={total}
        page={page}
        limit={limit}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};
