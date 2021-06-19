import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todos";
const app = express();

app.use("/todos", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ msg: "Hello" });
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Hello From The Middlewares");
  res.status(500).json({ err: err.message });
});
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ msg: "Hello" });
});
app
  .listen(3001, () => {
    console.log("server started on port ", 3001);
  })
  .on("error", (e) => {
    console.log(e);
  });
