const Course = require("../models/course");

const getCourseParams = (body) => {
  return {
    title: body.title,
    description: body.description,
    maxStudents: body.maxStudents,
    cost: body.cost,
  };
};

module.exports = {
  // index busca todos los cursos
  index: (req, res, next) => {
    Course.find()
      .then((courses) => {
        res.locals.courses = courses;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  // indexView renderiza la vista con todos los cursos
  indexView: (req, res) => {
    res.render("courses/index");
  },
  // newView renderiza la vista para agregar un nuevo curso
  newView: (req, res) => {
    res.render("courses/new");
  },
  // create registra un nuevo curso
  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    Course.create(courseParams)
      .then((course) => {
        req.flash("success", `${course.title} create successfully!`);
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error saving course: ${error.message}`);
        req.flash("error", `Failed to create course because: ${error.message}`);
        res.locals.redirect = "/courses/new";
        next();
      });
  },
  // redirectView renderiza la vista definida en res.locals.redirect
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  },
  // show busca la información de un curso
  show: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then((course) => {
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },
  // showView renderiza la información de un curso
  showView: (req, res) => {
    res.render("courses/show");
  },
  // edit renderiza la página de edición para un usuario
  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then((course) => {
        res.render("courses/edit", {
          course,
        });
      })
      .catch((error) => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },
  // update es la acción que nos permite actualizar la información de un subscriptor
  update: (req, res, next) => {
    let courseId = req.params.id;
    let courseParams = getCourseParams(req.body);
    Course.findByIdAndUpdate(courseId, {
      $set: courseParams,
    })
      .then((course) => {
        req.flash("success", `${courseParams.title} update successfully!`);
        res.locals.redirect = `/courses/get/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error updating course by ID: ${error.message}`);
        req.flash("error", `Failed to edit course ${courseParams.title}!`);
        res.locals.redirect = `/courses/${courseId}/edit`;
        next(error);
      });
  },
  // delete acción que eliminar un subscriptor
  deleteCourse: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndDelete(courseId)
      .then(() => {
        req.flash("success", "Course delete successfully!");
        res.locals.redirect = "/courses";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next(error);
      });
  },
};
