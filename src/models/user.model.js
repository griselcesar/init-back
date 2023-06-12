import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model("User", userSchema);

export default UserModel;
