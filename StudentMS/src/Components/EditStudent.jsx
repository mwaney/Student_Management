import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    year: "",
    address: "",
    course_id: "",
  });

  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5050/auth/course")
      .then((result) => {
        if (result.data.Status) {
          setCourse(result.data.Data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:5050/auth/students/${id}`)
      .then((result) => {
        setStudent({
          ...student,
          name: result.data.Data[0].name,
          email: result.data.Data[0].email,
          year: result.data.Data[0].year,
          address: result.data.Data[0].address,
          course_id: result.data.Data[0].course_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form", student);
    axios
      .put(`http://localhost:5050/auth/edit_student/${id}`, student)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/student");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
      <div className='p-3 rounded w-50 border'>
        <h3 className='text-center'>Edit Student</h3>
        <form className='row g-1' onSubmit={handleSubmit}>
          <div className='col-12'>
            <label htmlFor='nameInput' className='form-label'>
              Name
            </label>
            <input
              type='text'
              name='name'
              className='form-control rounded-0'
              id='nameInput'
              placeholder='Student Name'
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </div>
          <div className='col-12'>
            <label htmlFor='emailInput' className='form-label'>
              Email
            </label>
            <input
              type='email'
              name='email'
              className='form-control rounded-0'
              id='emailInput'
              placeholder='Enter Email Address'
              autoComplete='off'
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>

          <div className='col-12'>
            <label htmlFor='year' className='form-label'>
              Year
            </label>
            <div className='select-wrapper'>
              <select
                id='yearInput'
                name='year'
                className='form-control rounded-0'
                value={student.year}
                onChange={(e) =>
                  setStudent({ ...student, year: e.target.value })
                }
              >
                <option value=''>Select Year</option>
                <option value='1'>1st Year</option>
                <option value='2'>2nd Year</option>
                <option value='3'>3rd Year</option>
                <option value='4'>4th Year</option>
              </select>
              <div className='select-arrow'></div>
            </div>
          </div>
          <div className='col-12'>
            <label htmlFor='addressInput' className='form-label'>
              Address
            </label>
            <input
              type='text'
              name='address'
              id='addressInput'
              placeholder='Mama Ngina St Embu'
              className='form-control rounded-0'
              autoComplete='off'
              value={student.address}
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })
              }
            />
          </div>

          <div className='col-12 mb-3'>
            <label htmlFor='courseInput' className='form-label'>
              Course
            </label>
            <select
              name='course'
              id='course'
              className='form-select'
              value={student.course_id}
              onChange={(e) =>
                setStudent({ ...student, course_id: e.target.value })
              }
            >
              <option value=''>Select Course</option>
              {course &&
                course.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <div className='col-12'>
            <button type='submit' className='btn btn-primary w-100'>
              Edit Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
