// Practicando lo aprendido con la construcción de nuestra primera
// aplicación NodeJs.
const cities = require("cities");

// Buscamos la ciudad asociada a un código Zip específico
let myCity = cities.zip_lookup("10016");
console.log(myCity);
