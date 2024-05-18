import { Router } from "express";
import { check } from "express-validator";
import {
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
  "/:id",
  [
    validarJWT,
    check('id', 'Invalid id').isMongoId(),
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
  "/:id",
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



router.delete(
  "/:id",
  [
    validarJWT,
    check('id', 'Invalid Id').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
  ], userDelete);

export default router;