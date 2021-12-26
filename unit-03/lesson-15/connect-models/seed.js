const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// Conectando a nuestra base de datos en MongoDB
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.connection.on("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const contacts = [
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016,
  },
  {
    name: "Chef Eggpplant",
    email: "eggplant@recipeapp.com",
    zipCode: 20331,
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com",
    zipCode: 19103,
  },
];

// Removemos todad data existente
Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log(`Subscriber data is empty!`);
  })
  .catch((error) => {
    console.log(error.message);
  });

let commands = [];

// Iteramos a través del arreglo y definimos objetos subscribers para crear promesas.
contacts.forEach((c) => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email,
    })
  );
});

// Registramos las confirmaciones luego que las promesas se resuelvan.
Promise.all(commands)
  .then((r) => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(`ERROR: ${error}`);
  });
