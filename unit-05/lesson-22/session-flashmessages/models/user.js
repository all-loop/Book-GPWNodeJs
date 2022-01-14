const mongoose = require("mongoose");
const Subscriber = require("./subscriber");

const { Schema } = mongoose;

// Esquema asociado al usuario
const userSchema = Schema(
  {
    name: {
      first: {
        type: String,
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
      lowercase: true,
      unique: true,
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    subscribedAccount: {
      type: Schema.Types.ObjectId,
      ref: "Subscriber",
    },
  },
  {
    // timestamps nos permitira registrar las fechas de
    // creación y modificación para el objeto.
    timestamps: true,
  }
);

// Creación de un atributo virtual. Un atributo virtual
// es similar a un propiedad de un esquema a diferencia
// que no es guardado en la base de datos.
userSchema.virtual("fullname").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

// Definimos una acción previa (hook) a guardar un nuevo objeto
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
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
