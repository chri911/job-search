import { Avatar } from "@mui/material";

interface CompanyAvatarProps {
  company: string;
}
function getInitials(company: string) {
  return company
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const CompanyAvatar = ({ company }: CompanyAvatarProps) => {
  return (
    <Avatar
      sx={{
        width: 36,
        height: 36,
        fontSize: 13,
        fontWeight: 600,
        bgcolor: "grey.200",
        color: "text.primary",
      }}
    >
      {getInitials(company)}
    </Avatar>
  );
};
