import { Router } from "express";
import { check } from "express-validator";
import {
  getUsers,
  postUsers,
  getUserById,
  putUser,
  deleteUser,
  getUserEmail,
} from "./user.controller.js";
import {
  existingEmail,
  existeUsuarioById,
} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
  "/",
  validarJWT,
  getUsers
);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "This is not a valid id").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  getUserById
);

router.get(
  "/email/:correo",
  [
    //check("email", "Enter a email").not().isEmpty(),
    //check("email").custom(existingEmail),
    validarCampos,
  ],
  getUserEmail
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existingEmail),
    validarCampos,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  deleteUser
);

export default router;