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
        check("idUserAdmin", "This is not a valid idUserAdmin").not().isEmpty(),
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
        check("idUserAdmin", "This is not a valid idUserAdmin").not().isEmpty(),
        validarCampos,
    ],
    putHotel
);

router.delete('/deleteHotel/:hotelId', async(req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const hotel = await Hotel.findByIdAndUpdate(hotelId, {
            state: false
        }, {
            new: true
        });

        if (!hotel) {
            return res.status(404).json({
                error: 'Hotel not found',
            });
        }

        res.status(200).json({
            message: 'Hotel successfully removed',
            hotel,
        });
    } catch (error) {
        console.error('Error when deleting hotel:', error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
});

export default router;