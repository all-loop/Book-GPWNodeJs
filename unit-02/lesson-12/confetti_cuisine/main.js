const express = require("express");

// Mis módulos
// ---
const homeController = require("./controllers/homeController");

// Creación del servidor
const app = express();

// Configuraciones del servidor
app.set("port", process.env.PORT || 3000);

// Middlewares del servidor
// ---

// middlewares para interpretar las solicitudes entrantes.
// Le indicamos a la aplicación que use body-parser para el
// procesamiento de los parámetros codificados en la URL y JSON.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enturamiento
app.get("/", (req, res) => {
  res.send("Wecolme to Confetti Cuisine!");
});
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

// Levantando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server Running at http://localhost:${app.get("port")}`);
});
