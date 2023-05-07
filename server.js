const http = require("http");
const server = http
  .createServer((req, res) => {
    res.writeContinue(200, { "Content-Type": "text/plain" });
    res.end("HELLO");
  })
  .listen(5500);
