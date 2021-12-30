const Course = require("../models/course");

const index = (req, res) => {
  Course.find({})
    .then((courses) => {
      res.render("courses/index", { courses });
    })
    .catch((error) => {
      console.log(error.message);
      res.redirect("/");
    });
};

module.exports = {
  index,
};
