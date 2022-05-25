import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createStudent, reset } from "../../features/students/studentsSlice";
import { getStatus } from "../../features/status/statusSlice";
import Spinner from "../Spinner";

function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    indexNumber: "",
    studentStatus: "",
    year: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector(
    (state) => state.students
  );
  const { status } = useSelector((state) => state.status);

  const { name, lastName, indexNumber, studentStatus, year } = formData;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError) {
      toast.error(message);
    }
    dispatch(getStatus());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  console.log(status);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (indexNumber.length === 0) {
      toast.error("Unesite broj indexa");
    }
    dispatch(
      createStudent({
        name,
        lastName,
        indexNumber,
        studentStatus,
        year,
      })
    );
    if (isSuccess)
      setFormData({
        name: "",
        lastName: "",
        indexNumber: "",
        studentStatus: "",
        year: "",
      });
    navigate("/");
  };
  return (
    <>
      {" "}
      {status.length > 0 ? (
        <div>
          <section className="heading">
            <h1>Registracija novog studenta</h1>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="indexNumber"
                  name="indexNumber"
                  value={indexNumber}
                  placeholder="Unesite broj indexa"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Unesite ime studenta"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  placeholder="Unesite prezime studenta"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="year"
                  name="year"
                  value={year}
                  placeholder="Unesite godinu studija"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <select
                  name="studentStatus"
                  id="select"
                  onChange={onChange}
                  className="form-control"
                  placeholder="Dodajte status"
                >
                  <option hidden>Dodajte status studenta</option>
                  <option disabled="disabled" default>
                    Dodajte status studenta
                  </option>
                  <option value="redovan">{status[0].regular}</option>
                  <option value="vanredan">{status[0].partTime}</option>
                </select>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Potvrdi
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
export default StudentForm;
