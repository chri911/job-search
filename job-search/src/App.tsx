import { Outlet } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { ContentContainer } from "./components/ContentContainer";

function App() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fff" }}>
      <Sidebar
        user={{
          name: "Anna Kowalska",
          email: "anna.kowalska@example.com",
          initials: "AK",
        }}
      />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <TopBar
          actions={
            <Button
              variant="contained"
              color="accent"
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Add application
            </Button>
          }
        />
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Box>
    </Box>
  );
}

export default App;
