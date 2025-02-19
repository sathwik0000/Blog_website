import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const res = await axios.post("/register", inputs);
            setSuccess(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="auth">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                />
                <input
                    required
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>

                {error && <p className="error">{error}</p>}
                {success && <p className="success" style={{ color: "green" }} >{success}</p>}

                <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
            </form>
        </div>
    );
};

export default Register;
