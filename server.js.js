const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('Referrer-Policy', 'no-referrer');
res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
res.end("Omega Genesis Runtime Kernel - ONLINE", "utf8");  
});

server.listen(PORT, () => {
  console.log(`Omega Genesis running on port ${PORT}`);
});
