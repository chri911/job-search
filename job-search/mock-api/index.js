import express from "express";
import cors from "cors";
import { applications } from "./responses/applications.js";
import { contacts } from "./responses/contacts.js";
import { interviews } from "./responses/interviews.js";

const app = express();
app.use(cors());
app.use(express.json());

const REQUIRED_FIELDS = [
  "company",
  "position",
  "location",
  "workMode",
  "status",
  "appliedAt",
];

const validateApplication = (data) => {
  const fields = {};
  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      fields[field] = `${field} is required`;
    }
  }
  return fields;
};

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/applications", (req, res) => {
  res.json(applications);
});

app.get("/api/dashboard/stats", (req, res) => {
  const active = applications.filter(
    (a) => a.status === "applied" || a.status === "interview",
  ).length;

  const interviews = applications.filter(
    (a) => a.status === "interview",
  ).length;

  const responded = applications.filter(
    (a) =>
      a.status === "interview" ||
      a.status === "offer" ||
      a.status === "rejected",
  ).length;

  const responseRate =
    applications.length > 0
      ? Math.round((responded / applications.length) * 100)
      : 0;

  const offers = applications.filter((a) => a.status === "offer").length;

  const onWeekAgo = new Date();

  onWeekAgo.setDate(onWeekAgo.getDate() - 7);

  const addedThisWeek = applications.filter(
    (a) => new Date(a.appliedAt) >= onWeekAgo,
  ).length;

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const oldApplications = applications.filter(
    (a) => new Date(a.appliedAt) < oneMonthAgo,
  );

  const oldResponded = oldApplications.filter(
    (a) =>
      a.status === "interview" ||
      a.status === "offer" ||
      a.status === "rejected",
  ).length;

  const oldResponseRate =
    oldApplications.length > 0
      ? Math.round((oldResponded / oldApplications.length) * 100)
      : 0;

  const responseRateDelta = responseRate - oldResponseRate;

  const offersAwaitingReply = applications.filter(
    (a) => a.status === "offer" && a.nextStep,
  ).length;

  const interviewsScheduledNext = applications.filter(
    (a) => a.status === "interview" && a.nextStepDate,
  ).length;

  res.json({
    active,
    interviews,
    responseRate,
    offers,
    addedThisWeek,
    offersAwaitingReply,
    interviewsScheduledNext,
    responseRateDelta,
  });
});

app.post("/api/applications", (req, res) => {
  const fields = validateApplication(req.body);
  if (Object.keys(fields).length > 0) {
    return res.status(400).json({ error: "Validation failed", fields });
  }

  const newApplication = {
    id: String(Date.now()),
    ...req.body,
  };
  applications.push(newApplication);
  res.status(201).json(newApplication);
});

app.patch("/api/applications/:id", (req, res) => {
  const { id } = req.params;
  const application = applications.find((a) => a.id === id);

  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }
  const merged = { ...application, ...req.body };
  const fields = validateApplication(merged);
  if (Object.keys(fields).length > 0) {
    return res.status(400).json({ error: "Validation failed", fields });
  }

  Object.assign(application, req.body);
  res.json(application);
});

app.delete("/api/applications/:id", (req, res) => {
  const index = applications.findIndex((a) => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Application not found" });
  }
  applications.splice(index, 1);
  res.status(204).send();
});

const findApplicationOr404 = (req, res) => {
  const application = applications.find((a) => a.id === req.params.id);
  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return null;
  }
  return application;
};

app.get("/api/applications/:id", (req, res) => {
  const application = applications.find((a) => a.id === req.params.id);
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }
  res.json(application);
});

app.get("/api/applications/:id/contacts", (req, res) => {
  if (!findApplicationOr404(req, res)) return;
  const result = contacts.filter((c) => c.applicationId === req.params.id);
  res.json(result);
});

app.post("/api/applications/:id/contacts", (req, res) => {
  if (!findApplicationOr404(req, res)) return;

  if (!req.body.name || !req.body.role) {
    return res.status(400).json({
      error: "Validation failed",
      fields: {
        ...(!req.body.name && { name: "name is required" }),
        ...(!req.body.role && { role: "role is required" }),
      },
    });
  }

  const newContact = {
    id: `c${Date.now()}`,
    applicationId: req.params.id,
    ...req.body,
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.patch("/api/applications/:id/contacts/:contactId", (req, res) => {
  if (!findApplicationOr404(req, res)) return;

  const contact = contacts.find(
    (c) => c.id === req.params.contactId && c.applicationId === req.params.id,
  );
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  Object.assign(contact, req.body);
  res.json(contact);
});

app.get("/api/applications/:id/interviews", (req, res) => {
  if (!findApplicationOr404(req, res)) return;
  const result = interviews.filter((i) => i.applicationId === req.params.id);
  res.json(result);
});

app.post("/api/applications/:id/interviews", (req, res) => {
  if (!findApplicationOr404(req, res)) return;

  if (!req.body.type || !req.body.scheduledAt) {
    return res.status(400).json({
      error: "Validation failed",
      fields: {
        ...(!req.body.type && { type: "type is required" }),
        ...(!req.body.scheduledAt && {
          scheduledAt: "scheduledAt is required",
        }),
      },
    });
  }

  const newInterview = {
    id: `i${Date.now()}`,
    applicationId: req.params.id,
    ...req.body,
  };
  interviews.push(newInterview);
  res.status(201).json(newInterview);
});

app.patch("/api/applications/:id/interviews/:interviewId", (req, res) => {
  if (!findApplicationOr404(req, res)) return;

  const interview = interviews.find(
    (i) => i.id === req.params.interviewId && i.applicationId === req.params.id,
  );
  if (!interview) {
    return res.status(404).json({ error: "Interview not found" });
  }

  Object.assign(interview, req.body);
  res.json(interview);
});

const PORT = 5010;
app.listen(PORT, () =>
  console.log(`Mock API running on http://localhost:${PORT}`),
);
