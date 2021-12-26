// Importamos nuestro modelo Subscriber
const Subscriber = require("../models/subscriber");

// Función que devuelve todos los subscriptos en la db
const getAllSubscribers = (req, res, next) => {
  Subscriber.find({}, (error, subscriber) => {
    if (error) {
      next(error);
      return;
    }
    // Registramos los datos devueltos dentro del objeto request, para que puedan ser manejados por el siguiente middleware en la cadena.
    req.data = subscriber;
    next();
  });
};

module.exports = {
  getAllSubscribers,
};
