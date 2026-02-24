const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  // === METHOD LOCK (GET ONLY) ===
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Method Not Allowed", "utf8");
  }

  // === CORE SECURITY HEADERS ===
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

  // === RESPONSE ===
  res.end("Omega Genesis Runtime Kernel - ONLINE", "utf8");

});

server.listen(PORT, () => {
  console.log(`Omega Genesis running on port ${PORT}`);
});