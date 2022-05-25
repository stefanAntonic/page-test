import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserGraduate,
  FaBook,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Page test app</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/students">
                <FaUserGraduate />
                Studenti
              </Link>
            </li>
            <li>
              <Link to="/courses">
                <FaBook />
                Kursevi
              </Link>
            </li>
            <li>
              <button className="btn" onClick={handleLogout}>
                <FaSignOutAlt />
                Odjava
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Prijava
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Registracija
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
