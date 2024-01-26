import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const StudenDetailEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    year: "",
    course: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5050/student/student_detail/${id}`, {
        withCredentials: true,
      })
      .then((result) => {
        const studentData = result.data[0];
        setFormData({
          name: studentData.name,
          email: studentData.email,
          address: studentData.address,
          year: studentData.year,
          course: studentData.course,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5050/student/update/${id}`, formData, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.Status) {
          navigate(`/dashboard/student_detail/${id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Edit Student Details</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='year' className='form-label'>
            Year
          </label>
          <input
            type='text'
            className='form-control'
            id='year'
            name='year'
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='course' className='form-label'>
            Course
          </label>
          <input
            type='text'
            className='form-control'
            id='course'
            name='course'
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  );
};

export default StudenDetailEdit;
