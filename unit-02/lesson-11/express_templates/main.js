const express = require("express");
const layouts = require("express-ejs-layouts");

// Módulos propios
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const app = express();

// Configuraciones predefinidas del servidor
app.set("port", process.env.PORT || 3000);
// Express sabrá donde buscar nuestras vistas siempre y cuando usemos como motor de plantillas ejs, caso contrario, le deberemos indicar su ubicación.
app.set("view engine", "ejs");

// Middlewares
// layouts le indica a express y ejs que cada vista que sea renderizada usara como plantilla de diseño una llamada layouts.
// De esta manera podemos evitar la repetición de código HTML al hacer que varios archivos compartan cosas en común.
app.use(layouts);
// Establecemos nuestra carpeta public como el lugar donde se encontrará los activos de acceso público de nuestro proyecto.
app.use(express.static("public"));

app.get("/", homeController.welcomeClient);
app.get("/name/:myName", homeController.respondWithName);
// No se encontro ninguna ruta asociada
app.use(errorController.respondNoResourceFound);

// Middlewares para manejar errores
app.use(errorController.logErrors);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
