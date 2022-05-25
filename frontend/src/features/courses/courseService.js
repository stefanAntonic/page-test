import axios from "axios";

const API = "/api/course/";

// Kreira novi kurs
const createCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API, courseData, config);
  return response.data;
};

//Povlaci kurseve iz baze
const getCourses = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API, config);
    return response.data;
  };

  // Updatuje studenta iz baze na osnovu id
  const editCourse = async (courseId, courseData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      
      },
    };
    const response = await axios.patch(API + courseId, courseData, config);
    return response.data;
  };
   // Brise studenta iz baze na osnovu id
   const deleteCourse = async (studentId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(API + studentId, config);
    return response.data;
  };
const courseService = {
  createCourse,
  getCourses,
  deleteCourse,
  editCourse
};

export default courseService;
