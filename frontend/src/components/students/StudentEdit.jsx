import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editStudent, reset } from "../../features/students/studentsSlice";

function StudentEdit() {
  const [studentInfo, setStudentInfo] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    indexNumber: "",
    studentStatus: "",
    year: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isError, message } = useSelector((state) => state.students);
  const { id, name, lastName, indexNumber, studentStatus, year } = formData;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError) {
      toast.error(message);
    }
    setStudentInfo(JSON.parse(localStorage.getItem("edit")));

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  useEffect(() => {
    if (studentInfo) {
      setFormData({
        id: studentInfo[0]._id,
        name: studentInfo[0].name,
        lastName: studentInfo[0].lastName,
        indexNumber: studentInfo[0].indexNumber,
        studentStatus: studentInfo[0].studentStatus,
        year: studentInfo[0].year,
      });
    }
  }, [studentInfo]);

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
      editStudent({
        id,
        data:{
          name,
          lastName,
          indexNumber,
          studentStatus,
        },
      })
    );

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
      <section className="heading">
        <h3>
          Izmjenite podatke od studenta {name} {lastName}
        </h3>
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
              <option value="redovan">Redovan</option>
              <option value="vanredan">Vanredan</option>
            </select>
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
export default StudentEdit;
