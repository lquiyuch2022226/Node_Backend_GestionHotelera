import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

import {
    roomServicePost,
    roomServicesGet,
    roomServiceGetById,
    roomServicePut,
    roomServiceDelete
} from '../roomServiceAditional/roomServiceAditional.controller.js';

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
    ], roomServicePost
);

router.get("/", roomServicesGet);

router.get(
    "/:id",
    [
        validarJWT,
    ],
    roomServiceGetById
);

router.put(
    "/:id",
    [
        validarJWT,
        validarCampos
    ], roomServicePut
);

router.delete(
    "/:id",
    [
        validarJWT,
        validarCampos
    ], roomServiceDelete
);

export default router;