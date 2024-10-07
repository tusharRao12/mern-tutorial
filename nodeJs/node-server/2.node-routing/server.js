const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const requestHandler = (req, res) => {
  // pass the url
  const passedUrl = url.parse(req.url, true);
  // Home route
  if (passedUrl.pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Welcome to home page");
  } else if (passedUrl.pathname === "/about" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Welcome to about page");
  } else if (passedUrl.pathname === "/hello" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    const data = fs.readFileSync("index.html");
    res.end(data.toString());
    // res.sendile(path.join(__dirname, "index.html"));
  } else {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Not Found");
  }
};

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
