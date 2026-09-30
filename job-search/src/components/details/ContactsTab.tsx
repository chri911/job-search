import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  Stack,
  Skeleton,
  Alert,
  Link,
  Button,
  IconButton,
} from "@mui/material";
import { useApplicationContacts } from "../../hooks/useApplicationContacts";
import { useState } from "react";
import type { Contact } from "../../types";
import ContactDialog from "./ContactDialog";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

interface ContactsTabProps {
  applicationId: string;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export const ContactsTab = ({ applicationId }: ContactsTabProps) => {
  const {
    data: contacts,
    isLoading,
    isError,
  } = useApplicationContacts(applicationId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();

  const handleAddClick = () => {
    setEditingContact(undefined);
    setDialogOpen(true);
  };

  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact);
    setDialogOpen(true);
  };
  return (
    <Box sx={{ pt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button
          startIcon={<AddIcon fontSize="small" />}
          onClick={handleAddClick}
          sx={{ textTransform: "none" }}
        >
          Add contact
        </Button>
      </Box>
      {isError && <Alert severity="error">Failed to load contacts</Alert>}

      {isLoading &&
        Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} variant="text" height={60} />
        ))}

      {!isLoading && !isError && contacts?.length === 0 && (
        <Typography sx={{ color: "text.secondary" }}>
          No contacts yet
        </Typography>
      )}
      {!isLoading && !isError && (
        <List>
          {contacts?.map((contact) => (
            <ListItem key={contact.id} sx={{ px: 0 }}>
              <Stack
                spacing={2}
                sx={{ width: "100%", direction: "row", alignItems: "center" }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    fontSize: 13,
                    bgcolor: "grey.200",
                    color: "text.primary",
                  }}
                >
                  {getInitials(contact.name)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                    {contact.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                    {contact.role}
                  </Typography>
                </Box>
                <Stack spacing={0.25} sx={{ alignItems: "flex-end" }}>
                  {contact.email && (
                    <Link
                      href={`mailto:${contact.email}`}
                      sx={{ fontSize: 13 }}
                    >
                      {contact.email}
                    </Link>
                  )}
                  {contact.phone && (
                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                      {contact.phone}
                    </Typography>
                  )}
                </Stack>
                <IconButton
                  size="small"
                  onClick={() => handleEditClick(contact)}
                  aria-label="Edit contact"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Stack>
            </ListItem>
          ))}
        </List>
      )}
      <ContactDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        applicationId={applicationId}
        contact={editingContact}
      />
    </Box>
  );
};
