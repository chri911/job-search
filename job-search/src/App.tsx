import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { ContentContainer } from "./components/ContentContainer";
import { useState, type ReactNode } from "react";

export interface AppContextType {
  setTopBarActions: (actions: ReactNode) => void;
}

function App() {
  const [topBarActions, setTopBarActions] = useState<ReactNode>(null);
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
        <TopBar actions={topBarActions} />
        <ContentContainer>
          <Outlet context={{ setTopBarActions } satisfies AppContextType} />
        </ContentContainer>
      </Box>
    </Box>
  );
}

export default App;
