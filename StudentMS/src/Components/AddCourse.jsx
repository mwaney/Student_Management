import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [course, setCourse] = useState();
  const navigate = useNavigate();
  const makeCourse = (e) => setCourse(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:5050/auth/add_course", { course })

      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          navigate("/dashboard/course");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='p-3 rounded w-25 border'>
        <h2>Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='course'>Course</label>
            <input
              type='text'
              name='course'
              className='form-control'
              placeholder='Enter Course'
              autoComplete='off'
              value={course}
              onChange={makeCourse}
            />
          </div>
          <button type='submit' className='btn btn-success w-100'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
