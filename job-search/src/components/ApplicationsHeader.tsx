import { Box, Button, Stack, Typography } from "@mui/material";
interface ApplicationsHeaderProps {
  title: string;
  subtitle: string;
  total: number;
  onAddClick?: () => void;
}
export const ApplicationsHeader = ({ title, subtitle, total, onAddClick }: ApplicationsHeaderProps) => {
    return (
        <Box sx={{ mb: 3 }}>
      <Stack direction="row" sx={{ mb: 2, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="accent"
          onClick={onAddClick}
          sx={{ borderRadius: 2 }}
        >
          Add application
        </Button>
      </Stack>
      <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "flex-start"}}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Box>

        <Typography sx={{ color: 'text.secondary', fontSize: 14, pt: 1 }}>
          {total} total
        </Typography>
      </Stack>
    </Box>
    )
};
