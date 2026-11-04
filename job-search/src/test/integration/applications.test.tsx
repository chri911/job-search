import { describe, expect, it } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { renderApp } from "../render";
import { server } from "../handlers";
import { API } from "../handlers";
import { db } from "../db";

async function waitForDialogToClose() {
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
}

async function fillApplicationForm(
  user: UserEvent,
  dialog: HTMLElement,
  values: { company: string; position: string; location: string },
) {
  await user.type(
    within(dialog).getByRole("textbox", { name: /company/i }),
    values.company,
  );
  await user.type(
    within(dialog).getByRole("textbox", { name: /position/i }),
    values.position,
  );
  await user.type(
    within(dialog).getByRole("textbox", { name: /location/i }),
    values.location,
  );

  fireEvent.change(within(dialog).getByLabelText(/applied date/i), {
    target: { value: "2026-11-03" },
  });
}

describe("Applications: loading", () => {
  it("shows applications from the server and the total count", async () => {
    renderApp();

    expect(screen.queryByText("Nordcloud")).not.toBeInTheDocument(); // data has not arrived yet
    expect(await screen.findByText("Nordcloud")).toBeInTheDocument();
    expect(screen.getByText("Allegro")).toBeInTheDocument();
    expect(screen.getByText("5 total")).toBeInTheDocument();
  });

  it('shows an error and recovers after clicking "Try again"', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(`${API}/api/applications`, () =>
        HttpResponse.json({ error: "boom" }, { status: 500 }),
      ),
    );

    renderApp();
    expect(
      await screen.findByRole("heading", { name: /server error/i }),
    ).toBeInTheDocument();

    server.resetHandlers();
    await user.click(screen.getByRole("button", { name: /try again/i }));

    expect(await screen.findByText("Nordcloud")).toBeInTheDocument();
  });
});

describe("Applications: filters", () => {
  it("searches with debounce and writes the search term to the URL", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Nordcloud");

    await user.type(
      screen.getByRole("textbox", { name: /search/i }),
      "allegro",
    );
    expect(await screen.findByText("1 total")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("Nordcloud")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("Allegro")).toBeInTheDocument();
    expect(screen.getByText("1 total")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent("search=allegro");
  });

  it("filters by status and writes the status to the URL", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Nordcloud");

    await user.click(
      screen.getByRole("combobox", { name: /filter by status/i }),
    );
    await user.click(await screen.findByRole("option", { name: "Interview" }));

    await waitFor(() =>
      expect(screen.queryByText("Allegro")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("Nordcloud")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent(
      "status=interview",
    );
  });

  it("shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Nordcloud");

    await user.type(screen.getByRole("textbox", { name: /search/i }), "zzzzz");

    expect(
      await screen.findByText(/no applications found/i),
    ).toBeInTheDocument();
  });

  it("restores filters from the URL when the page opens", async () => {
    renderApp("/applications?search=book");

    expect(await screen.findByText("Booksy")).toBeInTheDocument();
    expect(screen.queryByText("Nordcloud")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /search/i })).toHaveValue(
      "book",
    );
  });
});

describe("Applications: creating", () => {
  it("creates an application and updates the list, the total and the notification", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Nordcloud");

    await user.click(screen.getByRole("button", { name: /add application/i }));
    const dialog = await screen.findByRole("dialog");
    await fillApplicationForm(user, dialog, {
      company: "Acme",
      position: "Frontend Developer",
      location: "Gdańsk",
    });
    await user.click(
      within(dialog).getByRole("button", { name: /save application/i }),
    );

    await waitForDialogToClose();
    expect(await screen.findByText("Acme")).toBeInTheDocument();
    expect(await screen.findByText("6 total")).toBeInTheDocument();
    expect(await screen.findByText("Acme added")).toBeInTheDocument();
    expect(db.applications).toContainEqual(
      expect.objectContaining({
        company: "Acme",
        workMode: "remote",
        status: "applied",
        appliedAt: "2026-11-03",
      }),
    );
  });

  it("does not submit an empty form and shows validation errors", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Nordcloud");

    await user.click(screen.getByRole("button", { name: /add application/i }));
    const dialog = await screen.findByRole("dialog");
    await user.click(
      within(dialog).getByRole("button", { name: /save application/i }),
    );

    expect(
      await within(dialog).findByText(/company is required/i),
    ).toBeInTheDocument();
    expect(db.applications).toHaveLength(5);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows a server error under the field and keeps the dialog open", async () => {
    const user = userEvent.setup();
    server.use(
      http.post(`${API}/api/applications`, () =>
        HttpResponse.json(
          {
            error: "Validation failed",
            fields: { company: "company is required" },
          },
          { status: 400 },
        ),
      ),
    );
    renderApp();
    await screen.findByText("Nordcloud");

    await user.click(screen.getByRole("button", { name: /add application/i }));
    const dialog = await screen.findByRole("dialog");
    await fillApplicationForm(user, dialog, {
      company: "Acme",
      position: "Dev",
      location: "Remote",
    });
    await user.click(
      within(dialog).getByRole("button", { name: /save application/i }),
    );

    expect(
      await within(dialog).findByText("company is required"),
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Applications: editing", () => {
  async function openEditDialogFor(user: UserEvent, company: RegExp) {
    const row = screen.getByRole("row", { name: company });
    await user.click(within(row).getByRole("button"));
    await user.click(await screen.findByRole("menuitem", { name: /^edit$/i }));
    return screen.findByRole("dialog");
  }

  it("opens the form prefilled with the application data and saves changes", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Nordcloud");

    const dialog = await openEditDialogFor(user, /nordcloud/i);
    expect(
      within(dialog).getByRole("textbox", { name: /company/i }),
    ).toHaveValue("Nordcloud");

    const position = within(dialog).getByRole("textbox", { name: /position/i });
    await user.clear(position);
    await user.type(position, "Senior Frontend Developer");

    await user.click(within(dialog).getByRole("combobox", { name: /status/i }));
    await user.click(await screen.findByRole("option", { name: "Offer" }));
    await user.click(
      within(dialog).getByRole("button", { name: /save application/i }),
    );

    await waitForDialogToClose();
    expect(
      await screen.findByText("Senior Frontend Developer"),
    ).toBeInTheDocument();
    expect(await screen.findByText("Nordcloud updated")).toBeInTheDocument();
    expect(db.applications.find((a) => a.id === "1")).toMatchObject({
      position: "Senior Frontend Developer",
      status: "offer",
    });
  });

  it('opens "Add application" with an empty form after editing another one', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Nordcloud");

    const editDialog = await openEditDialogFor(user, /nordcloud/i);
    await user.click(
      within(editDialog).getByRole("button", { name: /close/i }),
    );
    await waitForDialogToClose();

    await user.click(screen.getByRole("button", { name: /add application/i }));
    const addDialog = await screen.findByRole("dialog");

    expect(
      within(addDialog).getByRole("textbox", { name: /company/i }),
    ).toHaveValue("");
  });
});
