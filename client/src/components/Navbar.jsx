import React from 'react';
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";

const Navbar = () => {
    return(
        <div className='Navbar'>
        <div className='container'> 
        <div className='logo'>
            <img src = {Logo} alt="" />
        </div>
        <div className='links'> <Link className='link'to="/?cat=art"> <h6>ART</h6>
       </Link>
       <Link className='link'to="/?cat=science"> <h6>SCIENCE</h6>
       </Link>
       <Link className='link'to="/?cat=technology"> <h6>TECHNOLOGY</h6>
       </Link>
       <Link className='link'to="/?cat=CINEMA"> <h6>CINEMA</h6>
       </Link> 
       <Link className='link'to="/?cat=design"> <h6>DESIGN</h6>
       </Link>
       <Link className='link'to="/?cat=FOOD"> <h6>FOOD</h6>
       </Link>
       <span>Sathwik</span>
       <span>Logout</span>
       <span className='see'>
        <Link className='link' to="/write">Write</Link>
       </span>
        </div>
          </div>
        </div>
    );
};

export default Navbar;