const express = require("express");

const app = express();
const port = 3000;

// Middlewares utiles para parsear los datos entrantes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Obteniendo los datos solicitados a través de un método POST
app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

// Obteniendo los datos solicitados a través de una query
app.get("/", (req, res) => {
  console.log(req.query);
  res.send("Hola Mundo!");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
