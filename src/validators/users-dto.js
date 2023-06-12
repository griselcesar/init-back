import { findUserByEmail } from "../services/user.services.js";
import { hash } from "bcrypt";

const createUserDTO = async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  if (!name)
    return res.status(400).json({ message: "propiedad name no encontrada" });
  if (!surname)
    return res.status(400).json({ message: "propiedad surname no encontrada" });
  if (!email)
    return res.status(400).json({ message: "propiedad email no encontrada" });
  if (!password)
    return res
      .status(400)
      .json({ message: "propiedad password no encontrada" });
  const user = await findUserByEmail(email);
  if (user)
    return res
      .status(409)
      .json({ message: "el email ya se encuentra registrado" });

  const pws = await hash(password, 10);

  req.body.password = pws;

  next();
};

const userLoginDTO = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email)
    return res.status(400).json({ message: "propiedad email no encontrada" });
  if (!password)
    return res
      .status(400)
      .json({ message: "propiedad password no encontrada" });
  const user = await findUserByEmail(email);
  if (!user)
    return res.status(400).json({ message: "el usuario no está registrado" });
  req.id = user._id
  next()
};

export { createUserDTO,userLoginDTO };
