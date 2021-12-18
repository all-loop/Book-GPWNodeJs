// Módulos de terceros
const http = require("http");
const httpStatus = require("http-status-codes").StatusCodes;

// Módulos propios de la aplicación
const router = require("./router");
const contentTypes = require("./contentTypes");
const utils = require("./utils");

const port = 3000;

// añadimos una serie de rutas para nuestra página web y activos
router.get("/", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("views/index.html", res);
});

router.get("/courses.html", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("views/courses.html", res);
});

router.get("/contact.html", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("views/contact.html", res);
});

router.post("/", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.html);
  utils.getFile("views/thanks.html", res);
});

router.get("/images/graph.png", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.png);
  utils.getFile("public/images/graph.png", res);
});

router.get("/images/people.jpg", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.jpg);
  utils.getFile("public/images/people.jpg", res);
});

router.get("/images/product.jpg", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.jpg);
  utils.getFile("public/images/product.jpg", res);
});

router.get("/css/confetti_cuisine.css", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile("public/css/confetti_cuisine.css", res);
});

router.get("/css/bootstrap.css", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.css);
  utils.getFile("public/css/bootstrap.css", res);
});

router.get("/confetti_cuisine.js", (req, res) => {
  res.writeHead(httpStatus.OK, contentTypes.js);
  utils.getFile("public/js/confetti_cuisine.js", res);
});

// Iniciamos el servidor
http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);
