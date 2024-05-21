import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {
    opinionPost,
    opinionsGet,
    opinionGetById,
    opinionPut,
    opinionDelete
} from '../opinion/opinion.controller.js';

const router = Router();

router.post(
    "/addOp",
    [
        //validarJWT,
        check('description', 'The description of the opinion is required').not().isEmpty(),
        check('numStars', 'The number of stars is required').not().isEmpty(),
        check('idHotel', 'The Id Hotel of the opinion is required').not().isEmpty(),
        check('idUser', 'The idUser of the opinion is required').not().isEmpty(),
        validarCampos
    ], opinionPost
);

router.get("/getOp", opinionsGet);

router.get(
    "/:id",
    [
        //validarJWT,
    ],
    opinionGetById
);

router.put(
    "/:id",
    [
        validarJWT,
        validarCampos
    ], opinionPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        validarCampos
    ], opinionDelete
);

export default router;
