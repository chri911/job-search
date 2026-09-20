import { Box } from "@mui/material";

export function TopBar() {
  return (
    <Box
      sx={{
        height: 64,
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottom: "1px solid #EDEFF3",
      }}
    ></Box>
  );
}
