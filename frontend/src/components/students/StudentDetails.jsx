import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStudents, reset } from "../../features/students/studentsSlice";
import Spinner from "../Spinner";

function StudentDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector(
    (state) => state.students
  );
  const [studentInfo, setStudentInfo] = useState([]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }
    setStudentInfo(JSON.parse(localStorage.getItem("info")));
    dispatch(getStudents());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate, params]);

  const student = [];
  student.push(studentInfo);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        {student && student.length > 0 ? (
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Ime</th>
                  <th scope="col">Prezime</th>
                  <th scope="col">Br.indexa</th>
                  <th scope="col">Status</th>
                  <th scope="col">Godina</th>
                </tr>
              </thead>
              <tbody>
                {student.map((student) => {
                  return (
                    <tr key={student._id}>
                      <td>{student.name ? student.name : "Nije navedeno"}</td>
                      <td>
                        {student.lastName ? student.lastName : "Nije navedeno"}
                      </td>
                      <td>{student.indexNumber}</td>
                      <td>{student.studentStatus}</td>
                      <td>{student.year ? student.year : "Nije navedeno"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="trFlex">
            <Link className="btnEdit" to={`/edit/${student[0]._id}`} onClick={() => {
              localStorage.setItem('edit', JSON.stringify(student))
            }}>
                Izmjeni Studenta
              </Link>
              <Link className="btnCreate" to={"/create"}>
                Kreiraj Studenta
              </Link>
            
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
export default StudentDetails;
