const express = require("express");

// Módulos propios
const homeController = require("./controllers/homeController");

const app = express();

// Configuraciones predefinidas del servidor
app.set("port", process.env.PORT || 3000);
// Express sabrá donde buscar nuestras vistas siempre y cuando usemos como motor de plantillas ejs, caso contrario, le deberemos indicar su ubicación.
app.set("view engine", "ejs");

app.get("/", homeController.welcomeClient);
app.get("/name", homeController.respondWithName);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
