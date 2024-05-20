import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {
    getEventById,
    getEvents,
    putEvent,
    postEvents,
    deleteEvent
} from './event.controller.js';

const router = Router();

router.post(
    "/addEvent",
    [
        
        check('nameEvent', 'The name of the event is required').not().isEmpty(),
        check('description', 'The description of the event is required').not().isEmpty(),
        check('dateEvent', 'The date of the event is required').not().isEmpty(),
        check('idHotel', 'The Id Hotel is required').not().isEmpty(),
        check('idServicio', 'The Id Servicio is required').not().isEmpty(),
        check('idUser', 'The Id User is required').not().isEmpty(),
        validarCampos
    ],
    postEvents
);

router.get("/", getEvents);

router.get("/:id", validarJWT, getEventById);

router.put("/:id", 
    [
        validarJWT, 
        validarCampos
    ], 
    putEvent
);

router.delete("/:id", 
    [
        validarJWT, 
        validarCampos
    ], 
    deleteEvent
);

export default router;
