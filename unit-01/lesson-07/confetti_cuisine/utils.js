const fs = require("fs");
const httpStatus = require("http-status-codes").StatusCodes;

// Módulos propios de la aplicación
const contentTypes = require("./contentTypes");

module.exports = {
  getFile: (file, res) => {
    fs.readFile(`./{file}`, (err, data) => {
      if (error) {
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
        res.end("There was an error serving content!");
        return;
      }
      res.end(data);
    });
  },
};
