const express = require("express");
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsController");
const router = express.Router();

// Not yet protected 
router.route('/:id').patch(updateStudent).delete(deleteStudent)
router.route('/').get(getStudents).post(createStudent)



module.exports = router;
