const Subscriber = require("../models/subscriber");

// Creamos una función personalizada para traer los datos
// del subscriptor desde la consulta
const getSubscriberParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    zipCode: parseInt(body.zipCode),
  };
};

module.exports = {
  // index busca todos los documentos subscriptores
  index: (req, res, next) => {
    Subscriber.find()
      .then((subscribers) => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },
  // indexView renderiza la vista con todos los subscriptores
  indexView: (req, res) => {
    res.render("subscribers/index");
  },
  // newView renderiza la vista para agregar un nuevo subscriptor
  newView: (req, res) => {
    res.render("subscribers/new");
  },
  // create registra un nuevo subscriptor
  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then((subscriber) => {
        req.flash(
          "success",
          `${subscriber.email}'s account created successfully!`
        );
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error saving subscriber: ${error.message}`);
        req.flash(
          "error",
          `Failed to create subscriber account because: ${error.message}`
        );
        res.locals.redirect = "/subscribers/new";
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
  // show busca la información de un subscriptor
  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },
  // showView renderiza la información de un subscriptor
  showView: (req, res) => {
    res.render("subscribers/show");
  },
  // edit renderiza la página de edición para un usuario
  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        res.render("subscribers/edit", {
          subscriber,
        });
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },
  // update es la acción que nos permite actualizar la información de un subscriptor
  update: (req, res, next) => {
    let subscriberId = req.params.id;
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams,
    })
      .then((subscriber) => {
        req.flash("success", `${subscriberParams.email} update successfully!`);
        res.locals.redirect = `/subscribers/get/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        res.locals.redirect = `/subscribers/${subscriberId}/edit`;
        req.flash("error", `Failed to edit ${subscriberParams.email} account!`);
        next();
      });
  },
  // delete acción que eliminar un subscriptor
  deleteSubscriber: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndDelete(subscriberId)
      .then(() => {
        req.flash("success", "Subscribers delete successfully!");
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next(error);
      });
  },
};
