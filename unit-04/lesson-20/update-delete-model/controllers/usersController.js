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

// Renderiza el formulario para crear un nuevo usuario
const newView = (req, res) => {
  res.render("users/new");
};

// Función para registrar un nuevo usuario en la bd
const create = (req, res, next) => {
  let userParams = {
    name: {
      first: req.body.first,
      last: req.body.last,
    },
    email: req.body.email,
    password: req.body.password,
    zipCode: req.body.zipCode,
  };

  User.create(userParams)
    .then((user) => {
      res.locals.redirect = "/users";
      res.locals.user = user;
      next();
    })
    .catch((error) => {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    });
};

// Función que se encarga de redireccionar una acción (vista)
const redirectView = (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath) {
    res.redirect(redirectPath);
    return;
  }
  next();
};

// Función para mostrar la información especifica de un
// usuario
const show = (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      res.locals.user = user;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
};

const showView = (req, res) => {
  res.render("users/show");
};

module.exports = {
  index,
  indexView,
  newView,
  create,
  redirectView,
  show,
  showView,
};
