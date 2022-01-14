const express = require("express");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

// Requerimos los módulos parar incorporar los mensajes flash
// y las sesiones de nuestra aplicación.
const expresSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.connection.on("open", () => {
  console.log("Successfully connecting to MongoDB using mongoose!");
});

// Importando los módulos propios del proyecto
const userController = require("./controllers/usersController");
const errorController = require("./controllers/errorController");

// Configuraciones del servidor
const app = express();
const router = express.Router();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(layouts);
app.use("/", router);

// Definimos que usaremos cookies como forma de almacenamiento en nuestra sesión.
router.use(cookieParser("secret_passcode"));

// Configuramos la sesión de nuestra aplicación a través de express-session
router.use(
  expresSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

// Le indicamos a nuestra aplicación que usaremos mensajes flash a través de connect-flash
router.use(connectFlash());

// configuramos que router use methodOverride como middleware.
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// Enrutamiento (middleware) de la aplicación
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/users", userController.index, userController.indexView);
app.get("/users/new", userController.newView);
app.post("/users/create", userController.create, userController.redirectView);

router.get("/users/get/:id", userController.show, userController.showView);
router.get("/users/:id/edit", userController.edit);
router.put(
  "/users/:id/update",
  userController.update,
  userController.redirectView
);
router.delete(
  "/users/:id/delete",
  userController.deleteUser,
  userController.redirectView
);

// Middleware para manejar los errores
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Levantando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on http://localhost:${app.get("port")}`);
});
