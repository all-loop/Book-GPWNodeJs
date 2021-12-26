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

// Creamos un nuevo esquema con mongoose.Schema
const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number,
});

// Interactuamos con nuestra db a través de modelos, los que a su vez usan esquemas para su definición.
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// instanciamos un nuevo subscriptor
let subscriber1 = new Subscriber({
  name: "Jon Wexler",
  email: "jon@wexler.com",
});
// Guardamos el subscriptor en la db
subscriber1.save((error, savedDocument) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(savedDocument);
});

// Creamos y guardamos otro subscritor en la db en sólo un paso.
Subscriber.create(
  {
    name: "Jon Wexler2",
    email: "jon@jonwexler.com",
  },
  (error, savedDocument) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(savedDocument);
  }
);
