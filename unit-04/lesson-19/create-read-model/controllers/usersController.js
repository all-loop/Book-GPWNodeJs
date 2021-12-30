const User = require("../models/user");

const index = (req, res, next) => {
  User.find({})
    .then((users) => {
      // Almacenamos los usuarios sobre el objeto response.locals. Este objeto tiene la característica de poder ser accedido desde las vistas de nuestra aplicación.
      res.locals.users = users;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching users: ${error.message}`);
      // Enviamos el error a algún middleware de error definido.
      next(error);
    });
};

const indexView = (req, res) => {
  // Renderizamos la vista de forma separada
  res.render("users/index");
};

module.exports = {
  index,
  indexView,
};
