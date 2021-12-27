const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// Indicamos a mongoose que usaremos promesas
mongoose.Promise = global.Promise;

// Establecemos la conexión a nuestra base de datos
mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {
  useNewUrlParser: true,
});
mongoose.connection.on("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// Mis módulos
// ---
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscriberController = require("./controllers/subscribersController");

// Creación del servidor
const app = express();

// Configuraciones del servidor
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middlewares del servidor
// ---

// middleware para usar el módulo layout en nuestras vistas
app.use(layouts);

// middleware que establece nuestra la carpeta pública al cliente
app.use(express.static("public"));

// middlewares para interpretar las solicitudes entrantes.
// Le indicamos a la aplicación que use body-parser para el
// procesamiento de los parámetros codificados en la URL y JSON.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enturamiento
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/courses", homeController.showCourses);
app.get("/contact", subscriberController.getSubscriptionPage);
app.get("/subscribers", subscriberController.getAllSubscribers);
app.post("/subscribe", subscriberController.saveSubscriber);
app.post("/contact", homeController.postedSignUpForm);

// Middleware para manejar los errores
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Levantando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server Running at http://localhost:${app.get("port")}`);
});
