"use strict";

// Trabajando con módulos, importando propiedades de otro archivo
const messageModule = require("./positveMessages");
messageModule.messages.forEach((m) => console.log(m));
