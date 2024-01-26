import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./studentdetail.css";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5050/student/student_detail/" + id, {
        withCredentials: true,
      })
      .then((result) => {
        setStudent(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get("http://localhost:5050/student/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center mt-5'>
      <h2 className='text-center mb-4'>Student Details</h2>
      {student ? (
        <div className='card text-center shadow'>
          <img
            src={`http://localhost:5050/Images/${student.image}`}
            className='card-img-top student-detail-img'
            alt={student.name}
          />
          <div className='card-body'>
            <h3 className='card-title'>{student.name}</h3>
            <div className='card-text'>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
              <p>
                <strong>Address:</strong> {student.address}
              </p>
              <p>
                <strong>Class:</strong> Year {student.year}
              </p>
              <p>
                <strong>Course:</strong> {student.course_id}
              </p>
            </div>
            <div className='links'>
              <Link
                to={`/dashboard/edit_student/${id}`}
                className='btn btn-flip'
                data-back='Change Me'
                data-front='Edit'
              ></Link>
              <button
                className='btn btn-flip'
                onClick={handleLogout}
                data-back='Bye'
                data-front='LogOut'
              ></button>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;
