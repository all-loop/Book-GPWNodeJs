// Incorporamos el módulo express
const express = require("express");

// Inicializamos y guardamos una instancia del servidor dentro de la constante app
const app = express();
const port = 3000;

// Mapeamos una Ruta a un callback para una solicitud GET
app.get("/", (req, res) => {
  res.send("Hello, Universe!");
});

// Levantamos la aplicación para que escuche en el puerto 3000
app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
