const http = require("http");
const httpStatus = require("http-status-codes");

const port = 3000;
const app = http.createServer();

// Definimos un evento sobre el servidor
app.on("request", (req, res) => {
  // Analizando los datos entrantes
  // Registra el método HTTP usado
  console.log(`Method: ${getJSONString(req.method)}`);
  // Registra la URL
  console.log(`URL: ${getJSONString(req.url)}`);
  // Registra la cabecera
  console.log(`Headers: ${getJSONString(req.headers)}`);

  // Manejando datos enviados por método POST
  // Arreglo para manejar cada uno de los trozos que representan al contenido
  let body = [];
  // Configuramos un callback para ir registrando cada uno de los trozos de datos
  // entrantes
  req.on("data", (bodyData) => {
    body.push(bodyData);
  });
  // Cuando la transmisión de datos finalice, ejecutamos el callback definido
  req.on("end", () => {
    // Convertimos el cuerpo de arreglo a una cadena de texto
    body = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${body}`);
  });

  res.writeHead(httpStatus.StatusCodes.OK, { "Content-Type": "text/html" });

  let responseMessages = "<h1>This will show on the screen.</h1>";
  res.end(responseMessages);
});

app.listen(port);
console.log(`The server has started and is listening on port number ${port}`);

// Funcionalidades

// Convierte un objeto javascript en una cadena
const getJSONString = (obj) => JSON.stringify(obj, null, 2);
