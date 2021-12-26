// Importamos nuestro modelo Subscriber
const Subscriber = require("../models/subscriber");

// Función que devuelve todos los subscriptos en la db
const getAllSubscribers = (req, res, next) => {
  // Subscriber.find({}, (error, subscriber) => {
  //   if (error) {
  //     next(error);
  //     return;
  //   }
  //   // Registramos los datos devueltos dentro del objeto request, para que puedan ser manejados por el siguiente middleware en la cadena.
  //   req.data = subscriber;
  //   next();
  // });

  // Usando promesas
  Subscriber.find({})
    .exec()
    .then((subscribers) => {
      res.render("subscribers", {
        subscribers: subscribers,
      });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .finally(() => {
      console.log("promise <find subscribers> complete!");
    });
};

const getSubscriptionPage = (req, res) => {
  res.render("contact");
};

const saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode,
  });

  // newSubscriber.save((error, subscriber) => {
  //   if (error) {
  //     res.send(error);
  //     return;
  //   }
  //   res.render("thanks");
  // });

  // usando promesas
  newSubscriber
    .save()
    .then((result) => {
      res.render("thanks");
    })
    .catch((error) => {
      console.log(error.message);
      res.send(error);
    })
    .finally(() => {
      console.log("Promises <save subscriber> complete!");
    });
};

module.exports = {
  getAllSubscribers,
  getSubscriptionPage,
  saveSubscriber,
};
