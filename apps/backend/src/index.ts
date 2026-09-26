import { existsSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const PORT = Number(process.env.BACKEND_PORT ?? process.env.PORT ?? 3001);

function sendJson(res: ServerResponse, statusCode: number, body: unknown): void {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(body));
}

async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/sirs/health") {
    sendJson(res, 200, {
      status: true,
      endpoint: "/sirs/health",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
    return;
  }

  sendJson(res, 404, {
    status: false,
    message: "Not found",
  });
}

const server = createServer((req, res) => {
  void handleRequest(req, res).catch((error: unknown) => {
    console.error("Request failed:", error);
    sendJson(res, 500, {
      status: false,
      message: "Internal server error",
    });
  });
});

server.listen(PORT, () => {
  console.log(`SIRS backend listening on http://127.0.0.1:${PORT}`);
});
