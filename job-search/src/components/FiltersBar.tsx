import {
  Box,
  Button,
  InputAdornment,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
} from "@mui/material";
import type { ApplicationStatus, ViewMode } from "../types";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

interface FiltersBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusFilter: ApplicationStatus | "all";
  onStatusFilterChange: (value: ApplicationStatus | "all") => void;
  onMoreFiltersClick?: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const FiltersBar = ({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onMoreFiltersClick,
  viewMode,
  onViewModeChange,
}: FiltersBarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        <TextField
          size="small"
          placeholder="Search"
          label="Search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ width: 220 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
        <Select
          size="small"
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as ApplicationStatus | "all")
          }
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="all">All statuses</MenuItem>
          <MenuItem value="applied">Applied</MenuItem>
          <MenuItem value="interview">Interview</MenuItem>
          <MenuItem value="offer">Offer</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
        <Button
          variant="outlined"
          startIcon={<TuneIcon fontSize="small" />}
          onClick={onMoreFiltersClick}
          sx={{
            borderRadius: 2,
            color: "text.primary",
            borderColor: "divider",
          }}
        >
          More filters
        </Button>
      </Box>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_, newMode) => {
          if (newMode !== null) {
            onViewModeChange(newMode);
          }
        }}
        size="small"
        sx={{
          "& .MuiToggleButton-root.Mui-selected": {
            bgcolor: "accent.main",
            color: "accent.contrastText",
            borderColor: "accent.main",
            "&:hover": {
              bgcolor: "accent.main",
            },
          },
        }}
      >
        <ToggleButton value="list" sx={{ textTransform: "none", px: 2 }}>
          List
        </ToggleButton>
        <ToggleButton value="board" sx={{ textTransform: "none", px: 2 }}>
          Board
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
