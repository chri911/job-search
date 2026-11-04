import { http, HttpResponse } from "msw";
import { db } from "./db";
import type { Application } from "../types";
import { setupServer } from "msw/node";

export const API = "http://localhost:5010";

export const handlers = [
  http.get(`${API}/api/applications`, ({ request }) => {
    const params = new URL(request.url).searchParams;
    let result = [...db.applications];

    const search = params.get("search")?.toLowerCase();
    if (search) {
      result = result.filter(
        (a) =>
          a.company.toLowerCase().includes(search) ||
          a.position.toLowerCase().includes(search),
      );
    }

    const status = params.get("status");
    if (status && status !== "all") {
      result = result.filter((a) => a.status === status);
    }

    const [field, direction] = (params.get("sort") ?? "appliedAt:desc").split(
      ":",
    );
    const dir = direction === "asc" ? 1 : -1;
    result.sort((a, b) => {
      const x = String((a as unknown as Record<string, unknown>)[field] ?? "");
      const y = String((b as unknown as Record<string, unknown>)[field] ?? "");
      return x.localeCompare(y) * dir;
    });

    const total = result.length;
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || total || 1;
    const items = result.slice((page - 1) * limit, page * limit);

    return HttpResponse.json({ items, total });
  }),

  http.post(`${API}/api/applications`, async ({ request }) => {
    const body = (await request.json()) as Partial<Application>;
    const created = {
      ...body,
      id: String(Date.now() + db.applications.length),
    } as Application;
    db.applications.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch(`${API}/api/applications/:id`, async ({ params, request }) => {
    const application = db.applications.find((a) => a.id === params.id);
    if (!application) {
      return HttpResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }
    Object.assign(application, await request.json());
    return HttpResponse.json(application);
  }),

  http.get(`${API}/api/dashboard/stats`, () => {
    const apps = db.applications;
    const count = (...statuses: string[]) =>
      apps.filter((a) => statuses.includes(a.status)).length;
    return HttpResponse.json({
      active: count("applied", "interview"),
      interviews: count("interview"),
      responseRate: apps.length
        ? Math.round(
            (count("interview", "offer", "rejected") / apps.length) * 100,
          )
        : 0,
      offers: count("offer"),
      addedThisWeek: 0,
      interviewsScheduledNext: 0,
      offersAwaitingReply: 0,
      responseRateDelta: 0,
    });
  }),
];

export const server = setupServer(...handlers);
