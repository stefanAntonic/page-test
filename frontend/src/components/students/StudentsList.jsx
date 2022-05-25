import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getStudents,
  deleteStudent,
  reset,
} from "../../features/students/studentsSlice";

function StudentsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState('');
  const [allow, setAllow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { students, isLoading, isError, message } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }

    dispatch(getStudents());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);
  const handleDelete = (id) => {

    dispatch(deleteStudent(id))
    
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container">
      {students ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ime</th>
              <th scope="col">Prezime</th>
              <th scope="col">Br.indexa</th>
              <th scope="col">Detalji</th>
              <th scope="col">Ukloni</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.lastName}</td>
                  <td>{student.indexNumber}</td>
                  <td>
                    <Link
                      className="btnList"
                      to={`/students/details/${student._id}`}
                      onClick={() => {
                        localStorage.setItem('info', JSON.stringify(student))
                      }}
                    >
                      Detalji
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btnList"
                      onClick={() => {
                        setId(student._id);
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
      ) : (
        <h1>
          <Spinner />
        </h1>
      )}
      {confirm && (
        <span className="confirmation">
          <h2>Da li ste sigurni?</h2>
          <div>
            <button
              className="btnConfirm"
              onClick={() => {
                setAllow(true);
                setConfirm(false)
                handleDelete(id);
              }}
            >
              DA
            </button>
            <button
              className="btnConfirm"
              onClick={() => {
               setConfirm(false)
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
export default StudentsList;
