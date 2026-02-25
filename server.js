const http = require("http");
// === GLOBAL PROCESS ERROR GUARDS ===
process.on("uncaughtException", (err) => {
  console.error("[FATAL] uncaughtException:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[FATAL] unhandledRejection:", reason);
  process.exit(1);
});
const PORT = process.env.PORT || 3000;
// === STARTUP VALIDATION ===
if (!PORT || isNaN(PORT) || Number(PORT) <= 0) {
  console.error("[STARTUP ERROR] Invalid PORT configuration:", PORT);
  process.exit(1);
}const server = http.createServer((req, res) => {
// === STRUCTURED REQUEST LOGGING (PI-CORE-124.0.1) ===
const startMs = Date.now();

res.on("finish", () => {
  const durationMs = Date.now() - startMs;

  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "";

  const log = {
    ts: new Date().toISOString(),
    method: req.method,
    url: req.url,
    status: res.statusCode,
    duration_ms: durationMs,
    ip,
    ua: req.headers["user-agent"] || "",
  };

  console.log(JSON.stringify(log));
});
  if (req.method !== "GET") {    res.statusCode = 405;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Method Not Allowed", "utf8");
  }

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
res.setHeader("Pragma", "no-cache");
res.setHeader("Expires", "0");
res.setHeader("Surrogate-Control", "no-store");
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Omega Genesis Runtime Kernel - ONLINE", "utf8");
  }

  if (req.url === "/health") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("OK", "utf8");
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.end("Not Found", "utf8");

});

server.listen(PORT, () => {
  console.log(`Omega Genesis running on port ${PORT}`);
});
// === GRACEFUL SHUTDOWN HANDLER ===
const shutdown = () => {
  console.log("[SYSTEM] Graceful shutdown initiated...");
  server.close(() => {
    console.log("[SYSTEM] Server closed cleanly.");
    process.exit(0);
  });

  // Force shutdown if hanging
  setTimeout(() => {
    console.error("[SYSTEM] Forced shutdown.");
    process.exit(1);
  }, 5000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);