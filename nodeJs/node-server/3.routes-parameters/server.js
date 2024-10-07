const http = require("http");
const url = require("url");

const requestHandler = (req, res) => {
  // pass the url
  const passedUrl = url.parse(req.url, true);
  const pathname = passedUrl.pathname;
  // split the pathname
  const pathComponent = pathname.split("/").filter(Boolean);
  if (pathComponent[0] === "products" && pathComponent[1]) {
    // take the product  id and send to the user
    // perform db query to find the product
    const productId = pathComponent[1];
    // send to the user
    res.writeHead(200, { "content-Type": "text/plain" });
    res.end(`Product id - ${productId}`);
  } else {
    res.writeHead(200, { "content-Type": "text/plain" });
    res.end("Not found");
  }
};

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
