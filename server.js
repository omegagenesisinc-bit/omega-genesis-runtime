const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end("Omega Genesis Runtime Kernel - ONLINE");
});

server.listen(PORT, () => {
  console.log(`Omega Genesis running on port ${PORT}`);
});
