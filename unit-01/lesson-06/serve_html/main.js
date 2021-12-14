const fs = require("fs");
const http = require("http");
const httpStatus = require("http-status-codes").StatusCodes;

const port = 3000;
const app = http.createServer();

/**
 * En este ejemplo solo servimos aquellos archivmos HTML
 * que coincidan con la URL solicitada.
 */

const getViewURL = (url) => {
  return `views${url}.html`;
};

app.on("request", (req, res) => {
  // Obtenemos el string a la ruta del archivo
  let viewURL = getViewURL(req.url);
  // Buscamos el archivo en nuestro sistema de archivos
  fs.readFile(viewURL, (err, data) => {
    if (err) {
      res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html",
      });
      res.write("<h1>FILE NOT FOUND</h1>");
    } else {
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html",
      });
      res.write(data);
    }
    res.end();
  });
});

app.listen(port);
console.log(`The server has started and listening on port number: ${port}`);
