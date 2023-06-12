import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(cors("*"));
app.use(morgan("dev"));

import userRouter from "./routers/users.router.js"

app.use("/users/",userRouter)

export default app;
