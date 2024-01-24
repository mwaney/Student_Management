import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [studentTotal, setStudentTotal] = useState(0);
  const [courseTotal, setCourseTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    adminCount();
    studentCount();
    courseCount();
    adminDetails();
  }, []);

  const adminDetails = () => {
    axios.get("http://localhost:5050/auth/admin_details").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Data);
      } else {
        console.log(result.data.Error);
      }
    });
  };
  const adminCount = () => {
    axios.get("http://localhost:5050/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Data[0].admin);
      }
    });
  };

  const studentCount = () => {
    axios.get("http://localhost:5050/auth/student_count").then((result) => {
      if (result.data.Status) {
        setStudentTotal(result.data.Data[0].students);
      }
    });
  };
  const courseCount = () => {
    axios.get("http://localhost:5050/auth/course_count").then((result) => {
      if (result.data.Status) {
        setCourseTotal(result.data.Data[0].courses);
      }
    });
  };
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb--1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb--1'>
            <h4>Students</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb--1'>
            <h4>Course</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{courseTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins &&
              admins.map((item) => (
                <tr key={item.id}>
                  <td>{item.email}</td>
                  <td>
                    <button className='btn btn-info me-2'>Edit</button>
                    <button className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
