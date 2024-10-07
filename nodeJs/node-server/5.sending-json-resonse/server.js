const http = require("http");
const url = require("url");

const requestHandler = (req, res) => {
  const data = {
    id: 123,
    name: "Tushar",
    email: "tushar@gmail.com",
  };
  // Set the respone header to application/json
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(data));
};

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
