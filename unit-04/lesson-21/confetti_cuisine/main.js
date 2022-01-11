const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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
const courseController = require("./controllers/coursesController");
const userController = require("./controllers/usersController");

// Creación del servidor
const app = express();
// Creamos un objeto router para manejar el enrutamiento de la applicación
const router = express.Router();

// Configuraciones del servidor
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middlewares del servidor
// ---
app.use("/", router);

// middleware para usar el módulo layout en nuestras vistas
router.use(layouts);

// middleware que establece nuestra la carpeta pública al cliente
router.use(express.static("public"));

// middlewares para interpretar las solicitudes entrantes.
// Le indicamos a la aplicación que use body-parser para el
// procesamiento de los parámetros codificados en la URL y JSON.
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Configuramos la asistencia de métodos HTTP actualmente
// no soportados por enlaces o formularios HTML
router.use(
  methodOverride("_method", {
    methods: ["GET", "POST"],
  })
);

// Enrutamiento
router.get("/", homeController.index);

// Rutas del subscriptor
router.get(
  "/subscribers",
  subscriberController.index,
  subscriberController.indexView
);
router.get("/subscribers/new", subscriberController.newSubscriber);
router.post(
  "/subscribers/create",
  subscriberController.create,
  subscriberController.redirectView
);
router.get(
  "/subscribers/get/:id",
  subscriberController.show,
  subscriberController.showView
);
router.get("/subscribers/:id/edit", subscriberController.edit);
router.put(
  "/subscribers/:id/update",
  subscriberController.update,
  subscriberController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscriberController.erased,
  subscriberController.redirectView
);

// Rutas del usuario
router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.newUser);
router.post(
  "/users/create",
  userController.create,
  userController.redirectView
);
router.get("/users/get/:id", userController.show, userController.showView);
router.get("/users/:id/edit", userController.edit);
router.put(
  "/users/:id/update",
  userController.update,
  userController.redirectView
);
router.delete(
  "/users/:id/delete",
  userController.erased,
  userController.redirectView
);

// Rutas de los cursos
router.get("/courses", courseController.index, courseController.indexView);
router.get("/courses/new", courseController.newCourse);
router.post(
  "/courses/create",
  courseController.create,
  courseController.redirectView
);
router.get(
  "/courses/get/:id",
  courseController.show,
  courseController.showView
);
router.get("/courses/:id/edit", courseController.edit);
router.put(
  "/courses/:id/update",
  courseController.update,
  courseController.redirectView
);
router.delete(
  "/courses/:id/delete",
  courseController.erased,
  courseController.redirectView
);

// Middleware para manejar los errores
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Levantando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server Running at http://localhost:${app.get("port")}`);
});
