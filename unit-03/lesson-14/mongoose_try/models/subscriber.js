const mongoose = require("mongoose");

// Creamos un nuevo esquema con mongoose.Schema
const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number,
});

// Interactuamos con nuestra db a través de modelos, los que a su vez usan esquemas para su definición.
module.exports = mongoose.model("Subscriber", subscriberSchema);
