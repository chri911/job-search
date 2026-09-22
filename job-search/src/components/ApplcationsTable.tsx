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
} from "@mui/material";
import type { Application } from "../types";
import { StatusChip } from "./StatusChip";
import { CompanyAvatar } from "./CompanyAvatar";

interface ApplicationsTableProps {
  applications: Application[];
  isLoading?: boolean;
  isError?: boolean;
}

const ROW_HEIGHT = 72;

function formatDate(dateString: string): string {
  console.log(dateString);
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function locationLabel(app: Application): string {
  const modeLabel =
    app.workMode.charAt(0).toUpperCase() + app.workMode.slice(1);
  return `${modeLabel} · ${app.location}`;
}

export const ApplicationsTable = ({
  applications,
  isLoading,
  isError,
}: ApplicationsTableProps) => {
  if (isError) {
    return <Alert severity="error">Failed to load applications</Alert>;
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}
    >
      <Table>
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
            <TableCell>Company</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Applied</TableCell>
            <TableCell>Next step</TableCell>
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
                sx={{
                  height: ROW_HEIGHT,
                  "&:last-child td": { borderBottom: 0 },
                  "& td": { borderColor: "divider" },
                }}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
  );
};
