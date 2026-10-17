import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useBreakpoints } from "../hooks/useBreakpoints";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const ResponsiveDialog = ({ open, onClose, title, children }: Props) => {
  const { isPhone } = useBreakpoints();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isPhone}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 700,
          px: { xs: 2, sm: 3 },
        }}
      >
        {title}
        <IconButton onClick={onClose} aria-label="Close" edge="end">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pt: "8px !important", pb: 0 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
