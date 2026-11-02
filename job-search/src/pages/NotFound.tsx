import { Button } from "@mui/material";
import { ErrorState } from "../components/errors/ErrorState";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <ErrorState
      title="Page not found"
      message="The page you're looking for doesn't exist."
      action={
        <Button
          variant="contained"
          color="accent"
          onClick={() => navigate("/")}
        >
          Go to Overview
        </Button>
      }
    />
  );
};
