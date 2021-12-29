// Código que tiene como fin ser probado en el REPL de Node
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

const User = require("./models/user");
const Subscriber = require("./models/subscriber");

let testUser;
User.create({
  name: {
    first: "  Jon  ",
    last: "Wexler",
  },
  email: "jon@jonwexler.com",
  password: "pass123",
})
  .then((user) => {
    testUser = user;
    // Buscamos un subscriptor con el mismo email del usuario
    return Subscriber.findOne({
      email: user.email,
    });
  })
  .then((subscriber) => {
    // Conectamos un subscriptor y un usuario
    testUser.subscribedAccount = subscriber;
    testUser.save().then((user) => console.log("user updated"));
  })
  .catch((error) => console.log(error.message));
