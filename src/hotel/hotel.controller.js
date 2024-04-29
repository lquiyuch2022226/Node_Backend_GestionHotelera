import { response, request } from "express";
import Hotel from "./hotel.model";

export const gethotel = async (req, res) => {
    const {start, end} = req.query;
    const query = {state: true};

    const [total, hotels] = await Promise.all([
        Hotel.countDocuments(query),
        Hotel.find(query)
        .skip(Number(start))
        .limit(Number(end))
    ]);

    res.status(200).json({
        total, hotels
    });
}


export const postHotel = async (req, res) => {
    const {nameHote, address, category, services, numStars, idUserAdmin} = req.body;
    const hotel = new Hotel({nameHote, address, category, services, numStars, idUserAdmin});

    await hotel.save();

    res.status(200).json({
        hotel
    });
}

export const putHotel = async (req, res) => {

    const {id} = req. params;
    const {_id, ...resto} = req.body;

    await Hotel.findByIdAndUpdate(id, resto);

    const hotel = await Hotel.findOne({_id: id});

    res.status(200).json({
        msg: "Updating complete",
        hotel
    })

}