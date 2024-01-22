import express from "express";
import connection from "../utils/db_connection.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? and password =  ?";
  connection.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ loginStatus: false, error: "Server error" });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.post("/add_course", (req, res) => {
  const sql = "INSERT INTO course (`name`) VALUES (?)";
  connection.query(sql, [req.body.course], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

router.post("/add_student", (req, res) => {
  const sql =
    "INSERT INTO student (`name`, `email`, `password`, `year`, `course_id`, `image`) VALUES (?)";
  connection.query(sql, [req.body.name, req.body.course], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

router.get("/course", (req, res) => {
  const sql = "SELECT * FROM course";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Data: result });
  });
});

export { router as adminRouter };
