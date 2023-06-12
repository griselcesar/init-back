import UserModel from "../models/user.model.js";

const getAllUsers = async () => {
  const users = UserModel.find();
  return users;
};

const createUser = async (newUser) => {
  const user = await UserModel.create(newUser);
  return user;
};

const findUserById = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

const findUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

const deleteUserById = async (id) => {
  const user = await UserModel.findByIdAndRemove(id);
  return user;
};

const editUserById = async (id, newUser) => {
  const user = await UserModel.findByIdAndUpdate(id, newUser);
  return user;
};

export {
  getAllUsers,
  createUser,
  findUserByEmail,
  findUserById,
  deleteUserById,
  editUserById,
};
