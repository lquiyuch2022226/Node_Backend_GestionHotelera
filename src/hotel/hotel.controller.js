import {
    response,
    request
} from "express";
import Hotel from "./hotel.model.js";

export const getHotel = async(req, res) => {
    const {
        start,
        end
    } = req.query;
    const query = {
        state: true
    };

    try {
        const total = await Hotel.countDocuments(query);
        const hotels = await Hotel.find(query)
            .skip(Number(start))
            .limit(Number(end));
    res.status(200).json({
        total, hotels
    });
}

export const postHotel = async (req, res) => {
    const {nameHotel, address, category, services, numStars, idUserAdmin, numberOfReservations,imageUrl} = req.body;
    const hotel = new Hotel({nameHotel, address, category, services, numStars, idUserAdmin, numberOfReservations, imageUrl});
        res.status(200).json({
            total,
            hotels
        });
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


export const postHotel = async(req, res) => {
    const {
        nameHotel,
        address,
        category,
        services,
        numStars,
        idUserAdmin
    } = req.body;
    const hotel = new Hotel({
        nameHotel,
        address,
        category,
        services,
        numStars,
        idUserAdmin
    });

}

export const hotelById = async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotel.findOne({ _id: id });

    if (!hotel.state) {
        res.status(400).json({
            msg: 'This hotel was deleted :('
        });
    }

    res.status(200).json({
        hotel
    });
}


export const putHotel = async (req, res) => {
    try {
        await hotel.save();
        res.status(201).json({
            hotel
        });
    } catch (error) {
        console.error('Error adding hotel:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const putHotel = async(req, res) => {
    const {
        hotelId
    } = req.params;
    const {
        nameHotel,
        address,
        category,
        services,
        numStars,
        idUserAdmin
    } = req.body;
    try {
        const hotel = await Hotel.findByIdAndUpdate(hotelId, {
            nameHotel,
            address,
            category,
            services,
            numStars,
            idUserAdmin
        }, {
            new: true
        });

        if (!hotel) {
            return res.status(404).json({
                error: 'Hotel not found'
            });
        }
        res.status(200).json({
            hotel
        });
    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const deleteHotel = async(req, res) => {
    const {
        hotelId
    } = req.params;

    try {
        const hotel = await Hotel.findByIdAndUpdate(hotelId, {
            state: false
        });
        res.status(200).json({
            msg: 'Hotel successfully removed',
            hotel
        });
    } catch (error) {
        console.error('Error al eliminar el hotel:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};