const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: [],
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999,
    },
  },
  {
    // timestamps nos permitira registrar las fechas de
    // creación y modificación para el objeto.
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
