import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { existHotelById, existeUsuarioById } from '../helpers/db-validators.js';

import {
    reservationPost,
    reservationsGet,
    reservationPut,
    reservationDelete,
    reservationGetById
} from '../reservation/reservation.controller.js';

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('nameService', 'The name of the service is required').not().isEmpty(),
        check('description', 'The description of the service is required').not().isEmpty(),
        check('price', 'The price of the service is required').not().isEmpty(),
        check('idHotel', 'The Id Hotel of the service is required').not().isEmpty(),
        check('idUser', 'The idUser of the service is required').not().isEmpty(),
        validarCampos
    ], reservationPost
);

router.get("/", validarJWT, reservationsGet);

router.get(
    "/:id",
    [
        validarJWT,
    ],
    reservationGetById
);

router.put(
    "/:id",
    [
        validarJWT,
        validarCampos
    ], reservationPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        validarCampos
    ], reservationDelete
);

export default router;
