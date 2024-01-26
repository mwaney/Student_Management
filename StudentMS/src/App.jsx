import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Student from "./Components/Student";
import Profile from "./Components/Profile";
import Course from "./Components/Course";
import AddCourse from "./Components/AddCourse";
import AddStudent from "./Components/AddStudent";
import EditStudent from "./Components/EditStudent";
import Front from "./Components/Front";
import StudentLogin from "./Components/StudentLogin";
import StudentDetail from "./Components/StudentDetail";
import { useEffect } from "react";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Front />}></Route>
          <Route path='/adminlogin' element={<Login />}></Route>
          <Route path='/student_login' element={<StudentLogin />}></Route>
          <Route
            path='/student_detail/:id'
            element={
              <PrivateRoute>
                <StudentDetail />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path='' element={<Home />}></Route>
            <Route path='/dashboard/student' element={<Student />}></Route>
            <Route path='/dashboard/course' element={<Course />}></Route>
            <Route path='/dashboard/profile' element={<Profile />}></Route>
            <Route path='/dashboard/add_course' element={<AddCourse />}></Route>
            <Route
              path='/dashboard/add_student'
              element={<AddStudent />}
            ></Route>
            <Route
              path='/dashboard/edit_student/:id'
              element={<EditStudent />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
