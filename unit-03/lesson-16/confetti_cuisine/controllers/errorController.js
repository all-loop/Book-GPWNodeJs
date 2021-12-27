const httpStatus = require("http-status-codes").StatusCodes;

// Maneja cualquier solicitud que previamente no haya sido
// manejada.
const pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("error");
};

// Maneja cualquier error interno del servidor
const internalServerError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`Error occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is taking a nap!`);
};

module.exports = {
  pageNotFoundError,
  internalServerError,
};
