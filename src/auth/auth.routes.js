import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existingEmail } from "../helpers/db-validator.js";

const router = Router()

router.post('/login', 
    [
        check('email','El email es obligatorio').not().isEmpty(),
        check('email', 'Este no es un correo válido').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('password','El password debe de ser mayor a 6 caracteres').isLength({min:6,}),
        validarCampos
    ], login)

router.post('/register', 
    [
        check('email', 'Este no es un correo válido').isEmail(),
        check('email').custom(existingEmail),
        check('password','El password es obligatorio').not().isEmpty(),
        check('password','El password debe de ser mayor a 6 caracteres').isLength({min:6,}),
        check('name','El name es obligatorio').not().isEmpty(),
        check('lastName','El lastName es obligatorio').not().isEmpty(),
        validarCampos
    ], register)

export default router;