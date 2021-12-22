const respondWithName = (req, res) => {
  let name = req.params.myName;
  // render nos permite renderizar una vista personalizada.
  // Pasamos una variable local a una vista por renderizar
  res.render("index", { name });
};

const welcomeClient = (req, res) => {
  res.send("Hi, visit the path /name/yourname");
};

module.exports = {
  respondWithName,
  welcomeClient,
};
