import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import raxios from "../axios";

const Login = () => {
    const [inputs, setInputs] = useState({
        identifier: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await raxios.post("/login", inputs);

            if (res.data?.token) {
                sessionStorage.setItem("token", res.data.token);
                navigate("/");
            } else {
                setError("Invalid response from server. Please try again");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <style>
                {`
                .auth {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #1e3c72, #2a5298);
                }

                .auth-container {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    width: 350px;
                }

                .auth h1 {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                }

                .auth form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .auth input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 16px;
                    outline: none;
                }

                .auth input:focus {
                    border-color: #1e3c72;
                    box-shadow: 0 0 5px rgba(30, 60, 114, 0.5);
                }

                .auth button {
                    background: #1e3c72;
                    color: white;
                    font-size: 18px;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .auth button:hover {
                    background: #2a5298;
                }

                .auth .error {
                    color: red;
                    font-size: 14px;
                    margin-top: 10px;
                }

                .auth span {
                    display: block;
                    margin-top: 15px;
                    font-size: 14px;
                }

                .auth span a {
                    color: #1e3c72;
                    text-decoration: none;
                    font-weight: bold;
                }

                .auth span a:hover {
                    color: #2a5298;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .auth-container {
                        width: 90%;
                    }
                }
                `}
            </style>

            <div className="auth">
                <div className="auth-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            name="identifier"
                            value={inputs.identifier}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Login</button>

                        {error && <p className="error">{error}</p>}

                        <span>
                            Don't have an account? <Link to="/register">Register</Link>
                        </span>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
