import type { ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";

interface ErrorStateProps {
  title: string;
  message?: string;
  details?: string; // стек, показывается только в dev
  onRetry?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  action?: ReactNode;
  compact?: boolean; // строка внутри страницы, а не блок на всё место
  fullPage?: boolean;
}

export const ErrorState = ({
  title,
  message,
  details,
  onRetry,
  retryLabel = "Try again",
  isRetrying,
  action,
  compact,
  fullPage,
}: ErrorStateProps) => {
  return (
    <Box
      role="alert"
      sx={{
        display: "flex",
        flexDirection: compact ? "row" : "column",
        flexWrap: compact ? "wrap" : "nowrap",
        alignItems: "center",
        justifyContent: "center",
        textAlign: compact ? "left" : "center",
        gap: compact ? 2 : 1.5,
        minHeight: fullPage ? "100dvh" : compact ? 96 : 280,
        px: 3,
        py: compact ? 2 : 6,
        ...(compact && {
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }),
      }}
    >
      <Box
        sx={{
          width: compact ? 36 : 56,
          height: compact ? 36 : 56,
          borderRadius: "50%",
          bgcolor: "grey.100",
          color: "error.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ErrorOutlineIcon fontSize={compact ? "small" : "medium"} />
      </Box>

      <Box sx={{ flex: compact ? 1 : "none", minWidth: 0, maxWidth: 480 }}>
        <Typography
          component="h2"
          sx={{ fontWeight: 600, fontSize: compact ? 14 : 18 }}
        >
          {title}
        </Typography>
        {message && (
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: compact ? 13 : 14,
              mt: 0.5,
            }}
          >
            {message}
          </Typography>
        )}
      </Box>

      {(onRetry || action) && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
            mt: compact ? 0 : 1,
          }}
        >
          {onRetry && (
            <Button
              variant={compact ? "outlined" : "contained"}
              color={compact ? "inherit" : "accent"}
              size={compact ? "small" : "medium"}
              onClick={onRetry}
              disabled={isRetrying}
            >
              {isRetrying ? "Retrying..." : retryLabel}
            </Button>
          )}
          {action}
        </Box>
      )}

      {import.meta.env.DEV && details && (
        <Box
          component="pre"
          sx={{
            width: "100%",
            maxWidth: 720,
            maxHeight: 200,
            overflow: "auto",
            textAlign: "left",
            fontSize: 12,
            bgcolor: "grey.100",
            p: 1.5,
            borderRadius: 2,
            m: 0,
            mt: 1,
          }}
        >
          {details}
        </Box>
      )}
    </Box>
  );
};
