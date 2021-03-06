const express = require("express");
const layouts = require("express-ejs-layouts");

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

// Enrutamiento (middleware) de la aplicación
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/users", userController.index, userController.indexView);
app.get("/users/new", userController.newView);
app.post("/users/create", userController.create, userController.redirectView);

router.get("/users/get/:id", userController.show, userController.showView);

// Middleware para manejar los errores
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Levantando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on http://localhost:${app.get("port")}`);
});
