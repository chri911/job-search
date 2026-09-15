import { Typography, Box } from "@mui/material";

export const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Page not found
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>
        The page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
};
