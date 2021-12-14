const httpStatus = require("http-status-codes").StatusCodes;

const htmlContentType = {
  "Content-Type": "text/html",
};

// El objeto routes almacena las rutas que coincidarán con
// las respectivas solicitudes POST y GET.
const routes = {
  GET: {
    "/info": (req, res) => {
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/plain",
      });
      res.end();
    },
  },
  POST: {},
};

// La función handle nos ayuda a procesar el callback asociado a una ruta
exports.handle = (req, res) => {
  try {
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req, res);
    } else {
      res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html",
      });
      res.end("<h1>No such file exists.</h1>");
    }
  } catch (ex) {
    console.log(`error: ${ex}`);
  }
};

// La función get nos permite registrar el callback para una
// determinada ruta
exports.get = (url, action) => {
  routes["GET"][url] = action;
};

// La función post nos permite registrar el callback para una
// determinada ruta
exports.post = (url, action) => {
  routes["POST"][url] = action;
};
