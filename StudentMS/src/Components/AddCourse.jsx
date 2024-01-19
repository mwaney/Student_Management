import React, { useState } from "react";

const AddCourse = () => {
  const [course, setCourse] = useState();
  const makeCourse = (e) => setCourse(e.target.value);
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='p-3 rounded w-25 border'>
        <h2>Add Course</h2>
        <form>
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
