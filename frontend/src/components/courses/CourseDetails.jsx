import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { reset, getCourses } from "../../features/courses/courseSlice";
import Spinner from "../Spinner";

function CourseDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const { course, isError, isLoading, message } = useSelector(
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
  }, [user, dispatch, navigate, params]);
  const students = course.filter((course) => course._id === params.id);
  const options = [];
  students.forEach((element) => {
    element.students.forEach((e) => {
      options.push(e);
    });
  });
  console.log(options);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        {course.length === 0 ? (
          <Spinner />
        ) : (
          <div className="container">
            <h3>Spisak studenta koji pohadjaju kurs {students[0].name}</h3>
            {options.length > 0 ? (<table className="cdTable">
              <thead>
                <tr>
                  <th scope="col">Redni broj</th>
                  <th scope="col">Student</th>
                </tr>
              </thead>
              <tbody> 
                {options.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>) : (<h2>Trenutno nema studenata koji pohadjaju kurs</h2>)}
            
          </div>
        )}
      </div>
    </div>
  );
}
export default CourseDetails;
