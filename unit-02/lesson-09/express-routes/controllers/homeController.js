const welcome = (req, res) => {
  res.send("Hello, Universe!");
};

const sendReqParam = (req, res) => {
  let vegetable = req.params.vegetable;
  res.send(`This is the page for ${vegetable}`);
};

const logRequestPaths = (req, res, next) => {
  console.log(`request path: ${req.url}`);
  next();
};

module.exports = {
  welcome,
  sendReqParam,
  logRequestPaths,
};
