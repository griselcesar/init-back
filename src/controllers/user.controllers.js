import {
  createUser,
  deleteUserById,
  findUserById,
  getAllUsers,
} from "../services/user.services.js";
import { compare } from "bcrypt";
import { SignJWT } from "jose";

const getAllUsersController = async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json({
    message: "listado de usuarios registrados",
    count: users.length,
    users: users.map((user) => {
      return {
        id: user._id,
        fulName: `${user.surname}, ${user.name}`,
        email: user.email,
      };
    }),
  });
};
const findUserByIdController = async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);

  if (!user) return res.status(404).json({ message: "usuario no encontrado" });

  return res.status(200).json({
    message: "usuario encontrado",
    user: {
      id: user._id,
      email: user.email,
      fulName: `${user.surname}, ${user.name}`,
    },
  });
};
const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);

    return res.status(201).json({
      message: "usuario registrado correctamente",
      user: {
        íd: user._id,
        email: user.email,
        fullName: `${user.surname}, ${user.name}`,
      },
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const updateUserByIdController = (req, res) => {
  //TODO: pendiente
};
const deleteUserByIdController = async (req, res) => {
  const { id } = req.params;

  const user = await deleteUserById(id);
  if (!user) return res.status(404).json({ message: "usuario no encontrado" });

  return res.status(200).json({
    message: "usuario eliminado correctamente",
  });
};

const loginController = async (req, res) => {
  const user = await findUserById(req.id);
  if (!user) return res.status(404).json({ message: "usuario no encontrado" });
  const isValid = await compare(req.body.password, user.password);
  if (!isValid) return res.status(400).json({ message: "password incorrecto" });
  const { id } = req;
  const encoder = new TextEncoder();
  const constructorJWT = new SignJWT({ id });
  const jwt = await constructorJWT
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encoder.encode(process.env.PRIVATE_KEY));
  return res
    .status(200)
    .json({ message: `bienvenido, ${user.name}`, token: jwt });
};

export {
  getAllUsersController,
  findUserByIdController,
  createUserController,
  updateUserByIdController,
  deleteUserByIdController,
  loginController,
};
