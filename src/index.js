import { config } from "dotenv";
import mongoose from "mongoose";
import app from "./app.js"

config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("data base connected!");
    app.listen(process.env.PORT,() => {
      console.log(`api listened on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log(err);
  });
