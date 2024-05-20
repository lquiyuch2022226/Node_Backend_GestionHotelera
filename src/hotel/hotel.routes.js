import { Router } from "express";
import { check } from "express-validator";

import {
    gethotel,
    postHotel,
    //putHotel
} from "./hotel.controller.js";

//import {
//    existHotelById
//} from "../helpers/db-validator.js";

import { validarCampos } from "../middlewares/validar-campos.js";
//import { tieneRole } from "../middlewares/validar-roles.js";
//import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.get("/", gethotel)

router.post(
    "/addHotel",
    [
        check("nameHotel", "Insert date").not().isEmpty(),
        check("address", "Enter a finish date").not().isEmpty(),
        check("category", "This is not a valid id").not().isEmpty(),
        check("services", "This is not a valid id").not().isEmpty(),
        check("numStars", "This is not a valid id").not().isEmpty(),
        check("idUserAdmin", "This is not a valid id").not().isEmpty(),
        //check("role").custom(esRoleValido),
        validarCampos,
    ],
    postHotel
);



export default router;