import {
    Router
} from "express";
import {
    check
} from "express-validator";
import {
    getHotel,
    postHotel,
    putHotel,
    deleteHotel
} from "./hotel.controller.js";
import {
    validarCampos
} from "../middlewares/validar-campos.js";

const router = Router();


router.get("/hotel", getHotel);

router.post(
    "/addHotel", [
        check("nameHotel", "Insert nameHotel").not().isEmpty(),
        check("address", "Enter a finish address").not().isEmpty(),
        check("category", "This is not a valid category").not().isEmpty(),
        check("services", "This is not a valid services").not().isEmpty(),
        check("numStars", "This is not a valid numStars").not().isEmpty(),
        check("imageUrl", "This is not a valid image").not().isEmpty(),
        validarCampos,
    ],
    postHotel
);

router.put(
    "/updateHotel/:hotelId", [
        check("nameHotel", "Insert nameHotel").not().isEmpty(),
        check("address", "Enter a finish address").not().isEmpty(),
        check("category", "This is not a valid category").not().isEmpty(),
        check("services", "This is not a valid services").not().isEmpty(),
        check("numStars", "This is not a valid numStars").not().isEmpty(),
        check("imageUrl", "This is not a image").not().isEmpty(),
        validarCampos,
    ],
    putHotel
);

router.delete('/deleteHotel/:hotelId', deleteHotel);

export default router;