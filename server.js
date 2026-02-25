const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

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