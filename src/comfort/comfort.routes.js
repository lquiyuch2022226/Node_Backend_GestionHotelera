import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {
    comfortPost,
    comfortsGet,
    comfortGetById,
    comfortPut,
    comfortDelete
} from '../comfort/comfort.controller.js';

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('nameComfort', 'The name of the comfort is required').not().isEmpty(),
        check('idHotel', 'The Id Hotel of the comfort is required').not().isEmpty(),
        validarCampos
    ],
    comfortPost
);

router.get("/", validarJWT, comfortsGet);

router.get("/:id", validarJWT, comfortGetById);

router.put("/:id", 
    [
        validarJWT, 
        validarCampos
    ], 
    comfortPut
);

router.delete("/:id", 
    [
        validarJWT, 
        validarCampos
    ], 
    comfortDelete
);

export default router;
