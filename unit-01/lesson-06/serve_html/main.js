const fs = require("fs");
const http = require("http");
const httpStatus = require("http-status-codes").StatusCodes;

const port = 3000;
const app = http.createServer();

/**
 * En este ejemplo mostramos como enrutar nuestra aplicación
 * en base al tipo de archivos en nuestro proyecto.
 */

// Función que maneja los errores de nuestra app
const sendErrorResponse = (res) => {
  res.writeHead(httpStatus.NOT_FOUND, {
    "Content-Type": "text/html",
  });
  res.write("<h1>File Not Found!</h1>");
  res.end();
};

// Función para comprobar la existencia de un archivo
const customReadFile = (file_path, res) => {
  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, (error, data) => {
      if (error) {
        console.log(error);
        sendErrorResponse(res);
        return;
      }
      res.write(data);
      res.end();
    });
  } else {
    sendErrorResponse(res);
  }
};

app.on("request", (req, res) => {
  let url = req.url;
  if (url.indexOf(".html") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html",
    });
    customReadFile(`./views${url}`, res);
  } else if (url.indexOf(".js") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/javascript",
    });
    customReadFile(`./public/js${url}`, res);
  } else if (url.indexOf(".css") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/csss",
    });
    customReadFile(`./public/css${url}`, res);
  } else if (url.indexOf(".png") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "image/png",
    });
    customReadFile(`./public/images${url}`, res);
  } else {
    sendErrorResponse(res);
  }
});

app.listen(3000);
console.log(`The server is listening on port number: ${port}`);
