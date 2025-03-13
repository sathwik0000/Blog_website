import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
                <Link className="link" to="/Login">Login</Link>
              </span>
              <span className="see">
                <Link className="link" to="/Register">Register</Link>
              </span>
              <span className="see">
                <Link className="link" to="/Write">Event Register</Link>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
