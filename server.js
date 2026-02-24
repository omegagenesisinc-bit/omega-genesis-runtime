const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Omega Genesis Runtime Kernel — ONLINE");
});

server.listen(PORT, () => {
  console.log(`Omega Genesis running on port ${PORT}`);
});
