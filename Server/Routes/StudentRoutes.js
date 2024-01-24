import express from "express";
import connection from "../utils/db_connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/student_login", (req, res) => {
  const sql = "SELECT * FROM students WHERE email = ? ";
  connection.query(sql, [req.body.email], (err, passwordMatch) => {
    if (err) {
      console.error("Error executing login query", err);
      return res
        .status(500)
        .json({ loginStatus: false, error: "Server error" });
    }
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, result) => {
        if (err)
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (result) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "student", email: email },
            "student_secret_key",
            {
              expiresIn: "1d",
            }
          );
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
          return res.json({ loginStatus: true });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

export { router as studentRouter };
