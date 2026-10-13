import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
}

interface SidebarProps {
  user: {
    name: string;
    email: string;
    initials: string;
  };
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar = ({ user, mobileOpen, onMobileClose }: SidebarProps) => {
  const navItems: NavItem[] = [
    { label: "Overview", path: "/" },
    { label: "Applications", path: "/applications" },
    { label: "Pipeline", path: "/pipeline" },
    { label: "Interviews", path: "/interviews" },
  ];
  const content = (
    <Box
      sx={{
        width: 320,
        maxWidth: "85vw",
        height: "100%",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 3,
        px: 2,
        borderRadius: { xs: 0, lg: "16px 0 0 16px" },
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ px: 1, mb: 4, alignItems: "center" }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "secondary.main",
          }}
        />
        <Typography sx={{ fontWeight: 600, fontSize: 16, lineHeight: 2 }}>
          Pathway
        </Typography>
      </Stack>
      <Box component="nav">
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === "/"}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                px: 2,
                py: 1,
                color: "rgba(255,255,255,0.6)",
                "&.Mui-selected": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "#fff",
                },
                "&.Mui-selected:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.06)",
                },
              }}
              onClick={onMobileClose}
            >
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: { sx: { fontSize: 14 } },
                }}
              />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
      </Box>
      <Stack direction="row" spacing={1.5} sx={{ px: 1, alignItems: "center" }}>
        <Avatar
          sx={{
            bgcolor: "#F4A6C1",
            width: 36,
            height: 36,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {user.initials}
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            {user.email}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", lg: "block" }, height: "100%" }}>
        {content}
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        sx={{ display: { xs: "block", lg: "none" } }}
      >
        {content}
      </Drawer>
    </>
  );
};
