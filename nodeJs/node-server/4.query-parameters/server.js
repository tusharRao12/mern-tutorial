const http = require("http");
const url = require("url");

const requestHandler = (req, res) => {
  // pass the url
  const passedUrl = url.parse(req.url, true);
  // Extract query
  const queryParameters = passedUrl.query;
  console.log(queryParameters);

  res.writeHead(200, { "content-Type": "text/plain" });
  res.end("Welcome");
};

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
