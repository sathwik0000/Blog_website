import React , { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../axios";

const Register = () => {
  const [inputs, setInputs] =useState(
    {
      username: "",
      email: "",
      password: "",
    }
  )

  const handleChange = e => {
       setInputs(prev=>( {...prev, [e.target.name]: e.target.value}))    
  }

  const handleSubmit = async e =>{
     e.preventDefault() 
     try {
     const res = await instance.post("/register", inputs )
     console.log(res)
     } catch(err) {
      console.log(err)
     }
  }
  return (
   <div className="auth">
     <h1> Register</h1>
     <form>
      <input required type="text" placeholder="username" name='username' onChange={handleChange} />
      <input  required type="email" placeholder="E-mail" name='email' onChange={handleChange} />
      <input required type="password" placeholder="password" name='password' onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
      <p>This is an error!</p>
      <span>Do you  have an account?
        <Link to="/Login">login</Link>
      </span>
     </form>

   </div>

  );
};

export default Register;
