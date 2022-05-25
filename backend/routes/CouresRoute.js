const express = require("express");
const {
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const router = express.Router();

//Not yet protected
router.route('/').get(getCourse).post(createCourse)
router.route('/:id').put(updateCourse).delete(deleteCourse)

module.exports = router;