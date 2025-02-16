import React from 'react'
import { Link } from "react-router-dom";
import Menu from "../components/Menu"; 
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"


const Single = () => {
    return (
      <div className="single"> 
        <div className="content">
            <img src="https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg" alt ="" />
            <div className="user">
            <img src="https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg" alt ="" />
            <div className="info">
               <span>Sathwik</span>
               <p>posted 2 days ago</p>
            </div>
            <div className="edit">
            <Link to={`/write?edit=2`}>
            <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />

            </div>
            </div> 
            <h1> Lorem, ipsum dolor sit amet </h1>
            consectetur adipisicing elit. Praesentium laborum omnis, vitae veniam corporis in iure eius? Qui, quaerat, cum, quisquam vero hic recusandae non ipsum esse aspernatur officiis maxime.
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis blanditiis voluptate corrupti tenetur. Ad ea sed incidunt quod, iure vitae, soluta non praesentium numquam dolore sequi nulla dolores temporibus tempora.
            <br>
            </br>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem, laborum nobis autem harum consequatur magni sapiente sint, necessitatibus, provident aliquam eum vitae dolorem. Sit voluptate quam laborum amet soluta cupiditate!
            </p>
            </p>
        </div>
        <Menu />
      </div>
    );
  };
  
  export default Single;
  