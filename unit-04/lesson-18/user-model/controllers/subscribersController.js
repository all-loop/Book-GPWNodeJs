const Subcriber = require("../models/subscriber");

// Función que obtiene todos los subscriptores en la db
const getAllSubscribers = (req, res) => {
  Subcriber.find({})
    .exec()
    .then((subscribers) => {
      res.render("subscribers/index", { subscribers });
    })
    .catch((error) => {
      console.log(error.message);
      res.redirect("/");
    })
    .finally(() => {
      console.log("promise <find all subscribers> complete!");
    });
};

// Renderiza la página de contacto
const getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// Función que guarda en db a un subscriptor
const saveSubscriber = (req, res) => {
  let newSubscriber = new Subcriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode,
  });

  newSubscriber
    .save()
    .then((result) => {
      console.log(`successfully save subscriptor: ${result}`);
      res.render("thanks");
    })
    .catch((error) => {
      console.log(error.message), res.send(error);
    })
    .finally(() => {
      console.log("Promise <save subscriber> complete!");
    });
};

module.exports = {
  getAllSubscribers,
  getSubscriptionPage,
  saveSubscriber,
};
