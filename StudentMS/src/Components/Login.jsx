import React from 'react'
import "./login.css"

const Login = () => {
  return (
    <div class="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div class="p-3 rounded w-25 border loginForm">
            <h2>Login Page</h2>
            <form>
                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" class="form-control" placeholder="Enter Email" autocomplete="off" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Enter Password" />
                </div>
                <button class="btn btn-success w-100">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login