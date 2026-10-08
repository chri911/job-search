import { useNavigate } from "react-router-dom";
import type { Application } from "../types";
import { useDraggable } from "@dnd-kit/core";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { CompanyAvatar } from "./CompanyAvatar";

interface DraggableCardProps {
  application: Application;
}

export const DraggableCard = ({ application }: DraggableCardProps) => {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: application.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
      }
    : undefined;
  return (
    <Paper
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      elevation={isDragging ? 4 : 0}
      onClick={() => {
        if (!isDragging) navigate(`/applications/${application.id}`);
      }}
      sx={{
        p: 2,
        mb: 1.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        "&:hover": { borderColor: "text.secondary" },
        touchAction: "none",
      }}
    >
      <Stack
        spacing={1.5}
        sx={{ mb: 1, direction: "row", alignItems: "center" }}
      >
        <CompanyAvatar company={application.company} />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {application.company}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {application.position}
          </Typography>
        </Box>
      </Stack>
      {application.nextStep && (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {application.nextStep}
        </Typography>
      )}
    </Paper>
  );
};
