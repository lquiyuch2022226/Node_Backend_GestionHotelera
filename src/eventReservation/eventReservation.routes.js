import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
//import { existEventById, existUserById } from '../helpers/db-validators.js';

import {
    eventReservationPost,
    eventsGet,
    eventPut,
    eventDelete,
    eventGetByName
} from '../eventReservation/eventReservation.controller..js';

const router = Router();

router.post(
    "/addEventR",
    [
        //validarJWT,
        check('nameEvent', 'The name of the event is required').not().isEmpty(),
        check('description', 'The description of the event is required').not().isEmpty(),
        check('dateEvent', 'The date of the event is required').not().isEmpty(),
        check('idEvent', 'The Id Event of the event is required').not().isEmpty(),
        check('idUser', 'The idUser of the event is required').not().isEmpty(),
        validarCampos
    ], eventReservationPost
);

router.get("/", validarJWT, eventsGet);

router.get(
    "/:name",
    [
        validarJWT,
    ],
    eventGetByName
);

router.put(
    "/:name",
    [
        validarJWT,
        validarCampos
    ], eventPut
);

router.delete(
    "/:name",
    [
        validarJWT,
        validarCampos
    ], eventDelete
);

export default router;
