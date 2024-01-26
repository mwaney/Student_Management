import React, { useEffect } from "react";
import "./front.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Front = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the redundant declaration of 'navigate' here
    axios
      .get("http://localhost:5050/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate(`/student_detail/${result.data.id}`);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm glassyCard'>
        <h2 className='standOutHeader'>Login As</h2>
        <div className='d-flex justify-content-between mt-5 mb-2'>
          <button
            type='button'
            className='btn btn-primary glassyButton'
            onClick={() => {
              navigate("/student_login");
            }}
          >
            Student
          </button>
          <button
            type='button'
            className='btn btn-success glassyButton'
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Front;
