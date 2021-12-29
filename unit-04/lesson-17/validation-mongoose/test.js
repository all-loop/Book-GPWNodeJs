const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

// Módulos propios de la lección
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

// Variables para almacenar las instacias generadas
let testCourse, testSubscriber;

// Eliminamos cualquier información previa
Subscriber.deleteMany({})
  .then((items) => {
    console.log(`Removed ${items.n} records!`);
  })
  .then(() => {
    return Course.deleteMany({});
  })
  .then((items) => {
    console.log(`Removed ${items.n} records!`);
  })
  .then(() => {
    return Subscriber.create({
      name: "Jon",
      email: "jon@wexler.com",
      zipCode: 12345,
    });
  })
  .then((subscriber) => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({
      name: "Jon",
    });
  })
  .then((subscriber) => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Course.create({
      title: "Tomato Land",
      description: "Locally farmed tomatoes only",
      zipCode: 12345,
      items: ["cherry", "heirloom"],
    });
  })
  .then((course) => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })
  .then(() => {
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, "courses");
  })
  .then((subscriber) => {
    console.log(subscriber);
  })
  .then(() => {
    return Subscriber.find({
      courses: mongoose.Types.ObjectId(testCourse._id),
    });
  })
  .then((subscriber) => console.log(subscriber));
