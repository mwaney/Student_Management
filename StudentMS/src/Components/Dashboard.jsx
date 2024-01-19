import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <div className='pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-center text-decoration-none menu-link mx-auto'>
              <Link
                to='/dashboard'
                className='fs-5 fw-bolder d-none d-sm-inline text-white text-decoration-none text-center'
              >
                Students Dig-it
              </Link>
            </div>
            <ul
              className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start mx-auto'
              id='menu'
            >
              <li className='w-100'>
                <Link
                  to='/dashboard'
                  className='nav-link navigation-link text-white px-0 align-middle'
                >
                  <i className='fs-4 bi-speedometer2 ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to='/dashboard/student'
                  className='nav-link navigation-link px-0 align-middle text-white'
                >
                  <i className='fs-4 bi-people ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>
                    Manage Students
                  </span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to='/dashboard/course'
                  className='nav-link navigation-link px-0 align-middle text-white'
                >
                  <i className='fs-4 bi-columns ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Course</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to='/dashboard/profile'
                  className='nav-link navigation-link px-0 align-middle text-white'
                >
                  <i className='fs-4 bi-person ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Profile</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link
                  to='/dashboard/logout'
                  className='nav-link navigation-link px-0 align-middle text-white'
                >
                  <i className='fs-4 bi-power ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col p-0 m-0'>
          <div className='p-2 d-flex justify-content-center shadow'>
            <h4 className=''>Student Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
