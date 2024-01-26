import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { studentRouter } from "./Routes/StudentRoutes.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const port = 5050;
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", adminRouter);
app.use("/student", studentRouter);
app.use(express.static("Public"));

// middleware
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        return res.json({
          Status: false,
          error: "Invalid token",
        });
      }
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    res.clearCookie("token");
    return res.json({
      Status: false,
      error: "Invalid token",
    });
  }
};
app.get("/verify", verifyUser, (req, res) => {
  return res.json({
    Status: true,
    id: req.id,
    role: req.role,
  });
});

app.listen(port, () => {
  console.log(`listening at port ${port}...`);
});
