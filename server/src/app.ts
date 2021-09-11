import express from "express";
import morgan from "morgan";
import path from "path";
const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../client/build")));

app.get("/hello", (req, res) => {
  res.status(200).json({ msg: "haalo" });
});

export default app;
