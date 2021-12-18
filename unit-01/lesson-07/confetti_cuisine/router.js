const httpStatus = require("http-status-codes").StatusCodes;

// Módulos propios de la aplicación
const contentTypes = require("./contentTypes");
const utils = require("./utils");

// Objeto route para manejar las rutas de la app
const routes = {
  GET: {},
  POST: {},
};

// handle es la función que se encarga de manejar las solicitudes.
exports.handle = (req, res) => {
  try {
    routes[req.method][req.url](req, res);
  } catch (ex) {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("./views/error.html", res);
  }
};

// Las funciones get y post mapean las rutas con sus respectivos callbacks
exports.get = (url, action) => {
  routes["GET"][url] = action;
};

exports.post = (url, action) => {
  routes["POST"][url] = action;
};
