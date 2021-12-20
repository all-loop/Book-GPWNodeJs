const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Página principal");
});

// Express tiene básicamente tres maneras recibir datos del
// usuario en sus rutas:
// 1. A través del cuerpo de la petición (req.body)
// 2. Por medio de un parámetro, característica principal
//  de servicios REST (req.params)
// 3. A través de peticiones que sean seguidas de una
//  consulta (req.query)
app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
