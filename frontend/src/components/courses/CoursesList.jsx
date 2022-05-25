import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteCourse,
  getCourses,
  reset,
} from "../../features/courses/courseSlice";

function CoursesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");
  const [allow, setAllow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { course, isLoading, isError, message } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }

    dispatch(getCourses());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);
  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container">
      {course.length > 0 && course ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ime Kusra</th>
                <th scope="col">Broj participanata</th>
                <th scope="col">Detalji</th>
                <th scope="col">Ukloni</th>
              </tr>
            </thead>
            <tbody>
            {course.map((course) => {
              return (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.students.length}</td>
                  <td>
                    <Link
                      className="btnList"
                      to={`/course/details/${course._id}`}

                    >
                      Detalji
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btnList"
                      onClick={() => {
                        setId(course._id);
                        setConfirm(true)
                      }}
                    >
                      Ukloni
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
          <div className="trFlex">
              <Link className="btnCreate" to={"/courses/form"}>
                Kreiraj novi kurs
              </Link>
            </div>
        </div>
      ) : (
        <Spinner />
      )}
      {confirm && (
        <span className="confirmation">
          <h2>Da li ste sigurni?</h2>
          <div>
            <button
              className="btnConfirm"
              onClick={() => {
                setAllow(true);
                setConfirm(false);
                handleDelete(id);
              }}
            >
              DA
            </button>
            <button
              className="btnConfirm"
              onClick={() => {
                setConfirm(false);
              }}
            >
              NE
            </button>
          </div>
        </span>
      )}
    </div>
  );
}
export default CoursesList;

