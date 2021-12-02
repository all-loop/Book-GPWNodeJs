const http = require("http");
const httpStatus = require("http-status-codes");

const port = 3000;

// Creamos y definimos el servidor con los parámetros request y response.
const app = http.createServer((request, response) => {
  console.log("Received an incoming request!");
  response.writeHead(httpStatus.StatusCodes.OK, {
    "Content-Type": "text/html",
  });

  let responseMessage = "<h1>Hello, Universe!</h1>";
  // Escribimos la respuesta al cliente
  response.write(responseMessage);
  response.end();
  console.log(`Sent a response: ${responseMessage}`);
});

// Le indicamos a la aplicación por que puerto escuchar las peticiones
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
