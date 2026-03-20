import { BrowserWindow, BrowserView, Utils } from "electrobun/bun";
import type { ScoutsetRPC } from "../shared/rpc-types";

// Allow self-signed certificates for Elasticsearch connections.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Settings storage — use Electrobun's app-specific userData path
const settingsDir = Utils.paths.userData;
const settingsPath = `${settingsDir}/settings.json`;

// Helper: ensure settings directory exists
async function ensureSettingsDir(): Promise<void> {
  const { mkdir } = await import("node:fs/promises");
  await mkdir(settingsDir, { recursive: true });
}

// Helper: read settings from disk
async function readSettings(): Promise<Record<string, any>> {
  try {
    const file = Bun.file(settingsPath);
    if (await file.exists()) {
      return await file.json();
    }
  } catch {
    // File doesn't exist or is corrupted
  }
  return {};
}

// Helper: write settings to disk
async function writeSettings(settings: Record<string, any>): Promise<void> {
  await ensureSettingsDir();
  await Bun.write(settingsPath, JSON.stringify(settings, null, 2));
}

// Define RPC handlers (must be done before creating BrowserWindow)
const rpc = BrowserView.defineRPC<ScoutsetRPC>({
  maxRequestTime: 30000,
  handlers: {
    requests: {
      // Proxy HTTPS requests to Elasticsearch (bypasses CORS)
      request: async ({ url, body, headers }) => {
        try {
          const fetchOptions: RequestInit = {
            method: body ? "POST" : "GET",
            headers: {
              "content-type": "application/json",
              ...headers,
            },
          };

          if (body) {
            fetchOptions.body = JSON.stringify(body);
          }

          const response = await fetch(url, fetchOptions);
          return await response.json();
        } catch (err) {
          console.error("Request error:", err);
          return null;
        }
      },

      // Read all settings
      getSettings: async () => {
        return await readSettings();
      },

      // Set a single top-level key
      setSettings: async ({ key, value }) => {
        const settings = await readSettings();
        settings[key] = value;
        await writeSettings(settings);
        return { success: true };
      },
    },
    messages: {},
  },
});

// Create main window
const win = new BrowserWindow({
  title: "Scoutset",
  frame: { x: 200, y: 200, width: 1000, height: 800 },
  url: "views://mainview/index.html",
  rpc: rpc,
});

console.log("Scoutset started");
