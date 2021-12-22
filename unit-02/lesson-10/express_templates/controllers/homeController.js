const respondWithName = (req, res) => {
  // render nos permite renderizar una vista personalizada
  res.render("index");
};

const welcomeClient = (req, res) => {
  res.send("Hi, visit the path /name");
};

module.exports = {
  respondWithName,
  welcomeClient,
};
