import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button className="navButton">가입하기</button>
            <button className="navButton">로그인</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
