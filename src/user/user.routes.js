import { Router } from "express";
import { check } from "express-validator";
import {
<<<<<<< HEAD
  getUsers,
  postUsers,
  getUserById,
  putUser,
  deleteUser,
} from "./user.controller.js";

import {
  existenteEmail,
  esRoleValido,
  existeUsuarioById,
} from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", getUsers);

router.get(
  "/:id",
  [
    check("id", "This is not a valid id").isMongoId(),
    //check("id").custom(existeUsuarioById),
    //validarCampos,
  ],
  getUserById
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "Este no es un correo válido").isEmail(),
    //check("correo").custom(existenteEmail),
    //check("role").custom(esRoleValido),
    //validarCampos,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  usuariosPut
);
=======
  usuariosGet,
  getUserById,
  userPut,
  userDelete,
  getUserEmail
} from "./user.controller.js";

import {
  existeEmail,
  existeUsuarioById,
} from "../helpers/db-validator.js";

import { existeUserWithThisEmail } from '../helpers/db-validator.js'
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get("/",
  validarJWT,
  usuariosGet);

router.get(
  "/",
  [
    validarJWT,
    check('id').custom(existeUsuarioById),
    validarCampos
  ], getUserById);

router.get(
  "/email/:_email",
  [
    check('_email').custom(existeUserWithThisEmail),
    validarCampos
  ], getUserEmail);



router.put(
  "/put",
  [
    check("id", "The id is required").not().isEmpty(),
    check('id').custom(existeUsuarioById),
    check("name", "The name is required").not().isEmpty(),
    check("lastName", "The last name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("email").custom(existeEmail),
    validarCampos
  ], userPut);

router.post(
  "/addUser",
  [
    validarJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existeUsuarioById),
    check("name", "The name is required").not().isEmpty(),
    check("lastName", "The last name is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password needs a minimun of 6 characters").isLength({ min: 6 }),
    check("email", "Invalid email").isEmail(),
    check("email").custom(existeEmail),
    validarCampos
  ], );


>>>>>>> develop

router.delete(
  "/:id",
  [
    validarJWT,
<<<<<<< HEAD
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  usuariosDelete
);
=======
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
  ], userDelete);
>>>>>>> develop

export default router;