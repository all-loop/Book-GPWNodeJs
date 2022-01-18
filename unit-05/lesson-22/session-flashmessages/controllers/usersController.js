const User = require("../models/user");

const getCourseParams = (body) => {
  return {
    name: {
      first: body.first,
      last: body.last,
    },
    password: body.password,
    email: body.email,
    zipCode: parseInt(body.zipCode),
  };
};

module.exports = {
  // index busca todos los cursos
  index: (req, res, next) => {
    User.find()
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  // indexView renderiza la vista con todos los cursos
  indexView: (req, res) => {
    res.render("users/index");
  },
  // newView renderiza la vista para agregar un nuevo curso
  newUser: (req, res) => {
    res.render("users/new");
  },
  // create registra un nuevo curso
  create: (req, res, next) => {
    let userParams = getCourseParams(req.body);
    User.create(userParams)
      .then((user) => {
        req.flash(
          "success",
          `${user.fullname}'s account created successfully!`
        );
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/users/new";
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}`
        );
        next();
      });
  },
  // redirectView renderiza la vista definida en res.locals.redirect
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  },
  // show busca la información de un curso
  show: (req, res, next) => {
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
  },
  // showView renderiza la información de un curso
  showView: (req, res) => {
    res.render("users/show");
  },
  // edit renderiza la página de edición para un usuario
  edit: (req, res, next) => {
    let courseId = req.params.id;
    User.findById(courseId)
      .then((user) => {
        res.render("users/edit", {
          user,
        });
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  // update es la acción que nos permite actualizar la información de un subscriptor
  update: (req, res, next) => {
    let userId = req.params.id;
    let userParams = getCourseParams(req.body);
    User.findByIdAndUpdate(userId, {
      $set: userParams,
    })
      .then((user) => {
        res.locals.redirect = `/users/get/${userId}`;
        res.locals.course = user;
        next();
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },
  // delete acción que eliminar un subscriptor
  deleteUser: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next(error);
      });
  },
};
