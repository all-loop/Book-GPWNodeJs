const fs = require("fs");
const http = require("http");
const httpStatus = require("http-status-codes").StatusCodes;

const port = 3000;
const app = http.createServer();

// Configuramos las ruta para mapear los archivos HTML
const routeMAp = {
  "/": "views/index.html",
};

app.on("request", (req, res) => {
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html",
  });

  if (routeMAp[req.url]) {
    // Leemos el archivo mapeado a la ruta
    fs.readFile(routeMAp[req.url], (err, data) => {
      // Respondemos como contenido el archivo
      res.write(data);
      res.end();
    });
  } else {
    res.end("<h1>Sorry, not found.</h1>");
  }
});

app.listen(port);
console.log(`The server has started and listening on port number: ${port}`);
