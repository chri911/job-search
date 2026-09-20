import express from "express";
import cors from "cors";
import { applications } from "./responses/applications.js";

const app = express();
app.use(cors());
app.use(express.json());

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

const PORT = 5010;
app.listen(PORT, () =>
  console.log(`Mock API running on http://localhost:${PORT}`),
);
