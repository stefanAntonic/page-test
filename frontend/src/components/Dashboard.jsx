import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <div className="dashText">
        <h1>Page test app</h1>
        <h2>
          Aplikacija radjena u svrhu testiranja znanja za prijem u firmu Page
        </h2>
        <h3>
          Prilikom izrade aplikacije koristene su sljedece tehnike <br />
          Frontend: ReactJS i Redux Toolkit <br />
          Backend: Node.js, Express server i Mongodb
        </h3>
      </div>
      <div className="dashBtnContainer">
        <div className="dashBtnHolder">
          <Link className="btnEditDash" to={"/courses/form"}>
            Kreirajte kurs
          </Link>
        </div>
        <div className="dashBtnHolder">
          <Link className="btnCreateDash" to={"/create"}>
            Kreiraj Studenta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
