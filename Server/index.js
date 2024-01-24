import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { studentRouter } from "./Routes/StudentRoutes.js";

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
app.use("/auth", adminRouter);
app.use("/student", studentRouter);
app.use(express.static("Public"));

app.listen(port, () => {
  console.log(`listening at port ${port}...`);
});
