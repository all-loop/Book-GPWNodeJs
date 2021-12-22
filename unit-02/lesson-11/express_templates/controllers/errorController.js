const httpStatus = require("http-status-codes").StatusCodes;

// Un middleware para manejar errores siempre espera 4 argumentos.
const logErrors = (error, req, res, next) => {
  console.error(error.stack);
  // Continuamos con el siguiente middleware para manejar errores dentro de la cadena.
  next(error);
};

// Callback para indicar un estado 404
const respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  // sendFile nos permite enviar un archivo desde nuestro sistema
  res.sendFile(`./public/${errorCode}.html`, {
    root: "./",
  });
};

// Middleware para indicar un estado 500
const respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`Error ocurred: ${error.stack}`);
  res.status(errorCode);
  res.sendFile(`./public/${errorCode}.html`, {
    root: "./",
  });
};

module.exports = {
  logErrors,
  respondNoResourceFound,
  respondInternalError,
};
