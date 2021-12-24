const showCourses = (req, res) => {
  res.render("courses");
};

const showSignUp = (req, res) => {
  res.render("contact");
};

const postedSignUpForm = (req, res) => {
  res.render("thanks");
};

module.exports = {
  showCourses,
  showSignUp,
  postedSignUpForm,
};
