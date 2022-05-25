import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentForm from "./components/students/StudentForm";
import StudentDetails from "./components/students/StudentDetails";
import StudentsList from "./components/students/StudentsList";
import StudentEdit from "./components/students/StudentEdit";
import CourseFrom from "./components/courses/CourseForm";
import CourseDetails from "./components/courses/CourseDetails";
import CourseList from "./components/courses/CoursesList";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />s
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/create" element={<StudentForm/>} />
            <Route path="/edit/:infoId" element={<StudentEdit/>} />
            <Route path="/students/details/:id" element={<StudentDetails />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/form" element={<CourseFrom />} />
            <Route path="/course/details/:id" element={<CourseDetails />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
