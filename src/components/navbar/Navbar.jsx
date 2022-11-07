import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking</span>
        <div className="navItems">
          <button className="navButton">가입하기</button>
          <button className="navButton">로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
