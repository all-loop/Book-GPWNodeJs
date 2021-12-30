const User = require("../models/user");

const index = (req, res) => {
  User.find({})
    .then((users) => {
      res.render("users/index", {
        users,
      });
    })
    .catch((error) => {
      console.log(`Error fetching users: ${error.message}`);
      res.redirect("/");
    });
};

module.exports = {
  index,
};
