import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art"><h6>ART</h6></Link>
          <Link className="link" to="/?cat=science"><h6>SCIENCE</h6></Link>
          <Link className="link" to="/?cat=technology"><h6>TECHNOLOGY</h6></Link>
          <Link className="link" to="/?cat=cinema"><h6>CINEMA</h6></Link>
          <Link className="link" to="/?cat=design"><h6>DESIGN</h6></Link>
          <Link className="link" to="/?cat=food"><h6>FOOD</h6></Link>

          {username ? (
            <>
              <span className="see"><Link className="link" to="/single">Profile</Link></span>
              <span className="see logout" onClick={handleLogout}>Logout</span>
            </>
          ) : (
            <>
              <span className="see"><Link className="link" to="/login">Login</Link></span>
              <span className="see"><Link className="link" to="/register">Register</Link></span>
              <span className="see"><Link className="link" to="/write">write</Link></span>
              <span className="see"><Link className="link" to="/single">profile</Link></span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
