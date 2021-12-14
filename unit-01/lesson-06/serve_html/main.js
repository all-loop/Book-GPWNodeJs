const fs = require("fs");
const http = require("http");
const httpStatus = require("http-status-codes").StatusCodes;
const router = require("./router");

const port = 3000;
const app = http.createServer();

/**
 * En este ejemplo manejamos la rutas a través de un módulo
 * externo.
 */

const plainTextContentType = {
  "Content-Type": "text/plain",
};
const htmlContentType = {
  "Content-Type": "text/html",
};

// customReadFile es una función personalizada para la
// lectura de archivos de nuestro sistema
const customReadFile = (file, res) => {
  fs.readFile(file, (error, data) => {
    if (error) {
      console.log(`Error reading the file: ${error}`);
      res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, plainTextContentType);
      res.end("Server Error.");
      return;
    }
    res.end(data);
  });
};

// Registramos algunas rutas
router.get("/", (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end("INDEX");
});

router.get("/index.html", (req, res) => {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile("views/index.html", res);
});

router.post("/", (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end("POSTED");
});

app.on("request", (req, res) => {
  router.handle(req, res);
});

app.listen(3000);
console.log(`The server is listening on port number: ${port}`);
