import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./student.css";

const Student = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/auth/students")
      .then((result) => {
        if (result.data.Status) {
          setStudent(result.data.Data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5050/auth/delete_student/${id}`)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
          setStudent(student.filter((item) => item.id !== id));
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Students List</h3>
      </div>
      <Link to='/dashboard/add_student' className='btn btn-primary'>
        Add Student
      </Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Year</th>
              <th>Address</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((item) => (
              <tr key={item.id}>
                {console.log(item)}
                <td>{item.name}</td>
                <td>
                  <img
                    src={`http://localhost:5050/Images/${item.image}`}
                    alt=''
                    className='student_image'
                  />
                </td>
                <td>{item.email}</td>
                <td>{item.year}</td>
                <td>{item.address}</td>
                <td>{item.course_id}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_student/${item.id}`}
                    className='btn btn-info me-2'
                  >
                    Edit
                  </Link>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
