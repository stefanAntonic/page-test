const Courses = require("../models/Courses");
const asyncHandler = require("express-async-handler");

// Povlaci listu svih kurseva
const getCourse = asyncHandler(async (req, res) => {
  Courses.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Kreira novi kurs u bazi
const createCourse = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    res.send({
      message: "Popunite zadata polja",
    });
    throw new Error("Please add required field!");
  }
  
  const { name } = req.body
  if (!name) {
    res.status(400).json({
      message: "Unesite puno ime kursa"
    })
    
  }
  const courseExists = await Courses.findOne({ name });
  if (courseExists) {
    res.status(400).json({
      message: "Kurs se vec nalazi u bazi!",
    });
    throw new Error("Course already exists in db!");
  }

  const course = await Courses.create(req.body);
  if (course) {
    res.status(201).json({
      _id: course.id,
      name: course.name,
      students: course.students
    });
  } else {
    res.status(400).json({
      message: "Podaci nisu validni",
    });
    throw new Error("Invalid course data");
  }
});

// Updejtuje postojeci kurs na osnovu id
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  if (!course) {
    res.send({
      message: "Kurs nije pronadjen u bazi",
    });
  }
  const updatedCours = await Courses.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCours);
});

// Uklanja kurs iz baze na osnovu id
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  if (!course) {
    res.status(400).json({
      message: "Kurs nije pronadjen!",
    });
    throw new Error("Course is not found!");
  }
  await course.remove();
  res.status(200).json({
    id: req.params.id,
    message: "Kurs uspjesno obrisan",
  });
});

module.exports = {
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
