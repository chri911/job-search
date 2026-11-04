import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { resetDb } from "./db";
import { server } from "./handlers";

configure({ asyncUtilTimeout: 3000 });

beforeAll(() => {
  server.listen();
});

server.events.on("request:unhandled", ({ request }) => {
  throw new Error(`Unhandled ${request.method} request to ${request.url}`);
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  resetDb();
});

afterAll(() => server.close());

window.matchMedia = ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})) as typeof window.matchMedia;
