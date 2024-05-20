<<<<<<< HEAD
import {Router} from "express";
import {check} from "express-validator";
=======
import { Router } from "express";
import { check } from "express-validator";
>>>>>>> develop

import {
    getReservations,
    getReservationById,
    postReservation,
    putReservation,
    deleteReservation
<<<<<<< HEAD
} from "./reservation.controller";

import {

} from "../helpers/db-validator.js";
=======
} from "./reservation.controller.js";

import {
    existReservationById
} from "../helpers/db-validator.js";

import { validarCampos } from "../middlewares/validar-campos.js";
//import { tieneRole } from "../middlewares/validarRoles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.get("/", getReservations)

router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existReservationById),
        validarCampos,
    ],
    getReservationById
);

router.post(
    "/postRes",
    [
        check("dateStart", "Insert date").not().isEmpty(),
        check("dateFinish", "Enter a finish date").not().isEmpty(),
        check("idHabitacion", "This is not a valid id").not().isEmpty(),
        check("idUser", "This is not a valid id").not().isEmpty(),
        //check("correo").custom(existenteEmail),
        //check("role").custom(esRoleValido),
        validarCampos,
    ],
    postReservation
);

router.put(
    "/:id",
    [
        check("id", "This is not a valid id").isMongoId(),
        check("id").custom(existReservationById),
        validarCampos,
    ],
    putReservation
);

router.delete(
    "/:id",
    [
        //validarJWT,
        //tieneRole("ADMIN_ROLE", "CLIENT_ROLE"),
        check("id", "This is not a valid id").isMongoId(),
        check("id").custom(existReservationById),
        validarCampos,
    ],
    deleteReservation
);

export default router;
>>>>>>> develop
