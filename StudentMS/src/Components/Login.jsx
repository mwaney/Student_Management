import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const setEmail = (e) => {
    setValues({ ...values, email: e.target.value });
    setError(null);
  };
  const setPassword = (e) => {
    setValues({ ...values, password: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5050/auth/adminlogin", values, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
          console.log("Login Failed");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-danger'>{error && error}</div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              className='form-control'
              placeholder='Enter Email'
              autoComplete='off'
              value={values.email}
              onChange={setEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              className='form-control'
              placeholder='Enter Password'
              value={values.password}
              onChange={setPassword}
            />
          </div>
          <button type='submit' className='btn btn-success w-100'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
