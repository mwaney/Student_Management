import express from "express";
import connection from "../utils/db_connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/student_login", (req, res) => {
  const sql = "SELECT * FROM students WHERE email = ? ";
  connection.query(sql, [req.body.email], (err, result) => {
    if (err) {
      console.error("Error executing login query", err);
      return res
        .status(500)
        .json({ loginStatus: false, error: "Server error" });
    }

    // Check if result array is not empty
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password,
        result[0].password,
        (err, passwordMatch) => {
          if (err) {
            return res.json({
              loginStatus: false,
              Error: "Error comparing passwords",
            });
          }

          if (passwordMatch) {
            const email = result[0].email;
            const token = jwt.sign(
              { role: "student", email: email, id: result[0].id },
              "jwt_secret_key",
              {
                expiresIn: "1d",
              }
            );
            res.cookie("token", token, {
              httpOnly: true,
              sameSite: "None",
              secure: true,
            });
            return res.json({ loginStatus: true, id: result[0].id });
          } else {
            return res.json({
              loginStatus: false,
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    } else {
      // Handle the case where no user is found with the specified email
      return res.json({ loginStatus: false, Error: "No user found" });
    }
  });
});

// router.get("/student_detail/:id", (req, res) => {
//   const sql = "SELECT * FROM students WHERE id = ? ";
//   connection.query(sql, [req.params.id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ Status: false, error: "Server error" });
//     }
//     return res.json(result);
//   });
// });

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

router.get("/student_detail/:id", (req, res) => {
  const sql = `
    SELECT students.*, course.name AS course_name
    FROM students
    JOIN course ON students.course_id = course.id
    WHERE students.id = ?`;

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: false, error: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ Status: false, error: "Student not found" });
    }

    const studentData = {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      address: result[0].address,
      year: result[0].year,
      course: result[0].course_name,
      image: result[0].image,
    };

    return res.json([studentData]);
  });
});

export { router as studentRouter };
