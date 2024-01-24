import express from "express";
import connection from "../utils/db_connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? and password =  ?";
  connection.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.error("Error executing login query", err);
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

// Image Upload Code

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
// End of upload Logic

router.post("/add_student", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO students 
  (name, email, password, address, year, image, course_id) 
  VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error", details: err });

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.year,
      req.file.filename,
      req.body.course_id,
    ];

    connection.query(sql, [values], (err, result) => {
      if (err)
        return res.json({
          Status: false,
          Error: "Query Error",
          details: err,
        });
      return res.json({ Status: true });
    });
    console.log("SQL Query:", sql, values);
  });
});

// GET logic for the course
router.get("/course", (req, res) => {
  const sql = "SELECT * FROM course";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Data: result });
  });
});

// GET LOGIC for students

router.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Data: result });
  });
});

// GET logic for editing students

router.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM students WHERE id =?`;
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Data: result });
  });
});

// PUT logic for editing students
router.put("/edit_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE students 
    SET name = ?, email = ?, address = ?, year = ?, course_id = ? 
    WHERE id = ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.year,
    req.body.course_id,
  ];
  connection.query(sql, [...values, id], (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error", details: err });
    return res.json({ Status: true, Data: result });
  });
});

// GET logic for getting number of admins

router.get("/admin_count", (req, res) => {
  const sql = "SELECT count(id) as admin from admin";
  connection.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error", details: err });
    return res.json({ Status: true, Data: result });
  });
});
// GET logic for getting number of students

router.get("/student_count", (req, res) => {
  const sql = "SELECT count(id) as students from students";
  connection.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error", details: err });
    return res.json({ Status: true, Data: result });
  });
});
// GET logic for getting number of courses
router.get("/course_count", (req, res) => {
  const sql = "SELECT count(id) as courses from course";
  connection.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error", details: err });
    return res.json({ Status: true, Data: result });
  });
});

// GET logic for fetchin all admins
router.get("/admin_details", (req, res) => {
  const sql = "SELECT * FROM admin";
  connection.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error", details: err });
    return res.json({ Status: true, Data: result });
  });
});

// Logic for Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});
// Delete logic for a student

router.delete("/delete_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM students WHERE id =?`;
  connection.query(sql, [id], (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error", details: err });
    return res.json({ Status: true, Data: result });
  });
});

export { router as adminRouter };
