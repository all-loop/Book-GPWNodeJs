const http = require("http");
const httpStatus = require("http-status-codes");

const port = 3000;
const app = http.createServer();

// Definimos un evento sobre el servidor
app.on("request", (req, res) => {
  res.writeHead(httpStatus.StatusCodes.OK, { "Content-Type": "text/html" });

  let responseMessages = "<h1>This will show on the screen.</h1>";
  res.end(responseMessages);
});

app.listen(port);
console.log(`The server has started and is listening on port number ${port}`);
