import React, { useEffect, useState } from "react";
import "./AddStudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    address: "",
    course_id: null,
    image: "",
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("email", student.email);
    formData.append("password", student.password);
    formData.append("year", student.year);
    formData.append("address", student.address);
    formData.append("course_id", student.course_id);
    formData.append("image", student.image);

    axios
      .post("http://localhost:5050/auth/add_student", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/student");
        } else {
          alert(result.data.Error);
          console.log(result.data.details);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
      <div className='p-3 rounded w-50 border'>
        <h3 className='text-center'>Add Student</h3>
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
              required
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
              required
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label htmlFor='passwordInput' className='form-label'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='passwordInput'
              required
              placeholder='Enter Email Address'
              className='form-control rounded-0'
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
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
                required
                className='form-control rounded-0'
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
              required
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })
              }
            />
          </div>

          <div className='col-12'>
            <label htmlFor='inputGroupFile01' className='form-label'>
              Select Image
            </label>
            <input
              type='file'
              id='inputGroupFile01'
              className='form-control rounded-0'
              name='image'
              required
              onChange={(e) =>
                setStudent({ ...student, image: e.target.files[0] })
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
              required
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
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
