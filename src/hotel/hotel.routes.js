import { Router } from "express";
import { check } from "express-validator";
import multer from "multer";
import {
    gethotel,
    postHotel,
    putHotel,
    hotelById
} from "./hotel.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const upload = multer({ dest: 'uploads/' });

const router = Router()



router.get("/", gethotel)

router.get(
    '/one/:id',
    [
        check('id', 'This is not a valid id').isMongoId(),
        validarCampos
    ],
    hotelById);

router.post(
    "/addHotel",
    [
        check("nameHotel", "Insert date").not().isEmpty(),
        check("address", "Enter a finish date").not().isEmpty(),
        check("category", "This is not a valid id").not().isEmpty(),
        check("services", "This is not a valid id").not().isEmpty(),
        check("numStars", "This is not a valid id").not().isEmpty(),
        check("idUserAdmin", "This is not a valid id").not().isEmpty(),
        check("imageUrl", "The image is requerided").not().isEmpty(),
        validarCampos,
    ],
    postHotel
);

router.put(
    "/putHotel",
    [
        check("nameHotel", "The name is requerided").not().isEmpty(),
        check("address", "The address is requerided").not().isEmpty(),
        check("category", "The category is requerided").not().isEmpty(),
        check("services", "The services is requerided").not().isEmpty(),
        check("numStars", "The numStars is requerided").not().isEmpty(),
        check("idUserAdmin", "The idUserAdmin is requerided").not().isEmpty(),
        check("idUserAdmin", "This is not a valid id Mongo").isMongoId(),
        check("idUserAdmin", "The idUserAdmin is requerided").not().isEmpty(),
        check("imageUrl", "The image is requerided").not().isEmpty(),
        validarCampos,
    ],
    putHotel
);



export default router;