const passport = require("passport");
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
  // index busca todos los usuarios
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
  // indexView renderiza la vista con todos los usuarios
  indexView: (req, res) => {
    res.render("users/index");
  },
  // newView renderiza la vista para agregar un nuevo usuario
  newUser: (req, res) => {
    res.render("users/new");
  },
  // create registra un nuevo usuario
  create: (req, res, next) => {
    // Verificamos si hubo algún error con las validaciones
    if (req.skip) {
      return next();
    }

    let userParams = getCourseParams(req.body);
    let newUser = new User(userParams);

    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash(
          "success",
          `${user.fullname}'s account created successfully!`
        );
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash(
          "error",
          `Failed to create user account because ${error.message}`
        );
        res.locals.redirect = "/users/new";
        next();
      }
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
  // show busca la información de un usuario
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
  // showView renderiza la información de un usuario
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
  // update es la acción que nos permite actualizar la información de un usuariio
  update: (req, res, next) => {
    let userId = req.params.id;
    let userParams = getCourseParams(req.body);
    User.findByIdAndUpdate(userId, {
      $set: userParams,
    })
      .then((user) => {
        req.flash("success", `user ${user.fullname} update successfully`);
        res.locals.redirect = `/users/get/${userId}`;
        res.locals.course = user;
        next();
      })
      .catch((error) => {
        req.flas(
          "error",
          `Failed to update user account because: ${error.message}`
        );
        req.locals.redirect = `/users/${userId}/edit`;
        next();
      });
  },
  // delete acción que eliminar un usuario
  deleteUser: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then(() => {
        req.flash("success", "User delete successfully!");
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next(error);
      });
  },
  // Acción que renderiza la página para iniciar sesión
  login: (req, res) => {
    res.render("users/login");
  },
  // Acción que usamos para autenticar a un usuario
  // Llamamos a passport para autenticar al usuario vía una estrategia local.
  authenticate: passport.authenticate("local", {
    // configuramos los mensajes flash y sus redirecciones asociadas según el estado de autenticación del usuario.
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!",
  }),
  // Middleware validador
  validate: (req, res, next) => {
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim();
    req.check("email", "Email is invalid").isEmail();
    req
      .check("zipCode", "Zip code is invalid")
      .notEmpty()
      .isInt()
      .isLength({ min: 5, max: 5 })
      .equals(req.body.zipCode);
    req.check("password", "Password cannot be empty").notEmpty();

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  },
  // Acción para cerrar la sesión de un usuario en nuestro sitio web.
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },
};
