import axios from "axios";

const API = "/api/students/";

// Kreiraj novog studenta
const createStudent = async (studentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API, studentData, config);
  return response.data;
};

//Povlaci studente iz baze
const getStudents = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API, config);
    return response.data;
  };

  // Updatuje studenta iz baze na osnovu id
  const editStudent = async (studentId, studentData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      
      },
    };
    console.log(studentId);
    const response = await axios.patch(API + studentId, studentData, config);
    return response.data;
  };
   // Brise studenta iz baze na osnovu id
   const deleteStudent = async (studentId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(API + studentId, config);
    return response.data;
  };
const studentService = {
  createStudent,
  getStudents,
  deleteStudent,
  editStudent
};

export default studentService;
