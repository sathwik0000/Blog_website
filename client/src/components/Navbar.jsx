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
          {username ? (
            <>
              <span className="see">
                <Link className="link" to="/single">Profile</Link>
              </span>
              <span className="see logout" onClick={handleLogout}>Logout</span>
              <span className="see">
                <Link className="link" to="/write">Write</Link>
              </span>
            </>
          ) : (
            <>
              <span className="see">
                <Link className="link" to="/login">Login</Link>
              </span>
              <span className="see">
                <Link className="link" to="/register">Register</Link>
              </span>
             
              <span className="see">
                <Link className="link" to="/Write">write</Link>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;