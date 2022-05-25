const asyncHandler = require("express-async-handler");
const Students = require("../models/Students");

// Povlaci listu svih studenata
const getStudents = asyncHandler(async (req, res) => {
  await Students.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  }).clone();
});

// Kreira novog studenta u bazi
const createStudent = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Popunite zadata polja!",
    });
  }

  const { studentStatus, indexNumber } = req.body;
  if (!studentStatus || !indexNumber) {
    res.status(400).json({
      message: "Molimo vas da popunite obavezna polja!",
    });
    throw new Error("Please add required fields");
  }
  const studentExists = await Students.findOne({ indexNumber });
  if (studentExists) {
    res.status(400).json({
      message: "Student je vec registrovan u bazi!",
    });
    throw new Error("Student already exists in db");
  }
  const student = await Students.create(req.body);
  if (student) {
    res.status(201).json({
      _id: student.id,
      name: student.name,
      lastName: student.lastName,
      studentStatus: student.studentStatus,
      indexNumber: student.indexNumber,
      year: student.year,
    });
  } else {
    res.status(400).json({
      message: "Podaci nisu validni!",
    });
    throw new Error("Invalid user data");
  }
});

// Updejtuje postojeceg studenta u bazi
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Students.findById(req.params.id);
  if (!student) {
    res.send({
      message: "Student nije pronadjen u bazi!",
    });
  }
  const updatedStudent = await Students.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
res.status(200).json({
  _id: updatedStudent.id,
  name: updatedStudent.name,
  lastName: updatedStudent.lastName,
  studentStatus: updatedStudent.studentStatus,
  indexNumber: updatedStudent.indexNumber,
  year: updatedStudent.year,
}
  );
});

// Uklanja studenta iz baze na osnovu id
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Students.findById(req.params.id);
  if (!student) {
    res.status(400).json({
      message: "Student nije pronadjen!",
    });
    throw new Error("Student is not found!");
  }
  await student.remove();
  res.status(200).json({
    id: req.params.id,
    message: "Student uspjesno obrisan!",
  });
});

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
