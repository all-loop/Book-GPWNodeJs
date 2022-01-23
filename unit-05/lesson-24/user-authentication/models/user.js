const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passportLocalMessage = require("passport-local-mongoose");

// Importamos otros modelos necesarios
const Subscriber = require("./subscriber");

const userSchema = mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
        trim: true,
      },
      last: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    subscribedAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriber",
    },
  },
  { timestamps: true }
);

// Añadimos un atributo virtual para devolver el nombre
// completo del usuario
userSchema.virtual("fullname").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

// Añadimos un hook para el evento 'save' y asi enlazar
// previamente a un subscriptor si es el caso.
userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email,
    })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`ERROR in connecting subscriber: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

// userSchema.pre("save", function (next) {
//   let user = this;

//   // Hasheando la password del usuario creado
//   bcrypt
//     .hash(user.password, 10)
//     .then((hash) => {
//       user.password = hash;
//       bcrypt
//         .hash(user.email, 10)
//         .then((hash) => {
//           user.email = hash;
//           next();
//         })
//         .catch((error) => {
//           console.log(`Error in hashing email: ${error.message}`);
//           next(error);
//         });
//     })
//     .catch((error) => {
//       console.log(`Error in hashing password: ${error.message}`);
//       next(error);
//     });
// });
// Compara el password del usuariio con el password almacenado en la BD
// userSchema.methods.passwordComparison = function (inputPassword) {
//   let user = this;
//   return bcrypt.compare(inputPassword, user.password);
// };

// Añadiendo passport-local-mongoose como plugin a nuestro
// esquema user.
userSchema.plugin(passportLocalMessage, {
  usernameField: "email",
});

module.exports = mongoose.model("User", userSchema);
