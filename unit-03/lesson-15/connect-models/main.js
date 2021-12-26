const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");

// Conectando con la db
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// Importando nuestros controladores de la aplicación
const subscriberController = require("./controllers/subscribersController");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const app = express();

// Configuraciones del servidor
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middlewares
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res, next) => {
    console.log(req.data);
    res.render("subscribers", { subscribers: req.data });
  }
);
app.get("/contact", subscriberController.getSubscriptionPage);
app.post("/subscribe", subscriberController.saveSubscriber);

// Middlewares para manejar errores
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running on http://localhost:${app.get("port")}`);
});
