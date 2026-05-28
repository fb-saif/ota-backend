import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { hotUpdater } from "./hotUpdater";

const PORT = parseInt(process.env.PORT || "3000", 10);

// Create Hono app
const app = new Hono();

// Health check route
app.get("/", (c) => {
  return c.json({ status: "ok", service: "ota-backend" });
});

// Mount Hot Updater handler at basePath
// The hotUpdater.handler is a Web Standard Request handler
app.all(`${hotUpdater.basePath}/*`, async (c) => {
  const response = await hotUpdater.handler(c.req.raw);
  return response;
});

// Also handle exact basePath
app.all(hotUpdater.basePath, async (c) => {
  const response = await hotUpdater.handler(c.req.raw);
  return response;
});

// Start server
console.log(`Starting OTA Backend server on port ${PORT}...`);

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server running at http://localhost:${PORT}`);
console.log(`Hot Updater routes available at http://localhost:${PORT}${hotUpdater.basePath}`);
