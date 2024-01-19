import React from "react";
import { Link } from "react-router-dom";

const Course = () => {
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to='/dashboard/add_course' className='btn btn-primary'>
        Add Course
      </Link>
    </div>
  );
};

export default Course;
