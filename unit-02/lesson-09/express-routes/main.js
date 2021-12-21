const express = require("express");

// Módulos propios de la aplicación
const homeController = require("./controllers/homeController");

const app = express();
const port = 3000;

// Middlewares utiles para parsear los datos entrantes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para registar las rutas solicitadas
app.use(homeController.logRequestPaths);

app.get("/", homeController.welcome);
app.get("/items/:vegetable", homeController.sendReqParam);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
