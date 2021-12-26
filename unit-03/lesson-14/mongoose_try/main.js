const mongoose = require("mongoose");

// Configuramos la conexión a la DB
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});

// Asignamos la base de datos a la variable db
const db = mongoose.connection;

// Registramos el momento en que la aplicación conecta a la base de datos
db.on("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
