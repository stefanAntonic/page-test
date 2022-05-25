import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomSelect from "../Multiselect/Multiselect";
import { toast } from "react-toastify";
import { getStudents, reset } from "../../features/students/studentsSlice";
import { createCourse } from "../../features/courses/courseSlice";
import { useNavigate } from "react-router-dom";

function CourseForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    courseName: "",
    studentsArr: [],
  });
  const options = [];
  const { courseName, studentsArr } = formData;
  const { isSuccess, isError, message } = useSelector((state) => state.course);

  const { students } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(getStudents());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);
  students.map((student) => {
    return options.push({
      label: student.name,
      value: student.name.toLowerCase(),
    });
  });
  const onChangeInput = (e) => {
    const options = [...e];
    let label = [];
    options.forEach((option) => {
      return label.push(option.label);
    });
    setFormData((prevState) => ({
      ...prevState,
      studentsArr: label,
    }));
  };
  console.log(studentsArr);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCourse({
        name: courseName,
        students: studentsArr,
      })
    );
    if (isSuccess) {
      setFormData({
        courseName: "",
        studentsArr: [],
      });
      navigate("/courses");
    }
  };
  return (
    <>
      <section className="heading">
        <h1>Kreiranje novog kursa</h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="courseName"
              name="courseName"
              value={courseName}
              placeholder="Unesite ime kursa"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <CustomSelect
              isMulti={true}
              onChange={onChangeInput}
              options={options}
              placeholder={"Unesite studente"}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Potvrdi
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
export default CourseForm;
