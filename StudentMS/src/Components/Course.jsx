import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Course = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5050/auth/course")
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.Data);
          setCourse(result.data.Data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Course List</h3>
      </div>
      <Link to='/dashboard/add_course' className='btn btn-primary'>
        Add Course
      </Link>
      <div className='mt-3'>
        {course === null ? (
          <p>Loading...</p>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {course &&
                course.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Course;
