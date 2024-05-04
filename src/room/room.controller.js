import { response, request } from "express"
import Room from "./room.model"

export const roomPost = async (req, res) => {
    const { type, capacity, price, availableDate, idHotel, idUser } = req.body;

    const room = new Room({ type, capacity, price, availableDate, idHotel, idUser });

    await room.save();

    res.status(200).json({
        room
    });
}

export const roomsGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, rooms] = await Promise.all([
        Room.countDocuments(query),
        Room.find(query)
            .select('-state')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        rooms
    });
}

export const roomGetById = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id);

    if (!room.state) {
        res.status(400).json({
            msg: 'This room was deleted :('
        });
    }

    res.status(200).json({
        room
    });
}

export const roomPut = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    const room = await Room.findById(id);
  
    if (!room.state) {
        return res.status(400).json({
            msg: "This ROOM doesn't exist because it was deleted",
        });
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
        msg: 'This ROOM was UPDATED:',
        updatedRoom
    });
}

export const roomDelete = async (req, res) => {
    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room.state) {
        return res.status(400).json({
            msg: "This ROOM doesn't exist because it was deleted",
        });
    }

    const deletedRoom = await Room.findByIdAndUpdate(id, { state: false });

    res.status(200).json({
        msg: 'This ROOM was DELETED:',
        deletedRoom
    });
}
