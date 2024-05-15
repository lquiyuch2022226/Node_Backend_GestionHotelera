import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
//import { existeRoomById } from '../helpers/db-validators.js';

import {
    roomPost,
    roomsGet,
    roomPut,
    roomDelete,
    roomGetById
} from '../room/room.controller.js';

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('type', 'The type of the room is required').not().isEmpty(),
        check('capacity', 'The capacity of the room is required').not().isEmpty(),
        check('price', 'The price of the room is required').not().isEmpty(),
        check('availableDate', 'The available date of the room is required').not().isEmpty(),
        check('idHotel', 'The Id Hotel of the room is required').not().isEmpty(),
        check('idUser', 'The idUser of the room is required').not().isEmpty(),
        validarCampos
    ], roomPost
);

router.get("/",
    validarJWT,
    roomsGet);

router.get(
    "/:id",
    [
        validarJWT,
    ],
    roomGetById
);

router.put(
    "/:id",
    [
        validarJWT,
        validarCampos
    ], roomPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        validarCampos
    ], roomDelete
);

export default router;