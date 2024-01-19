import express from "express";
import connection from "../utils/db_connection.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? and password =  ?";
  connection.query(sql, [req.body.email, req.body.password], (err, result) => {
    // if (err) return res.json({ loginStatus: false, Error: "Query error" });

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

export { router as adminRouter };
