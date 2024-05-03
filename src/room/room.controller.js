import { response, request } from "express"
import Room from "./room.model"

export const getRooms = async(res, request) => {
    const {end, start} = req.query
    const query = {state: true}

    const [total, rooms] = await Promise.all([
        Room.countDocuments(query),
        Room.find(query)
        .skip(Number(start))
        .limit(Number(end))
    ])

    res.status(200).json({
        total, rooms
    })

}


export const postRooms = async(req, res) => {
    
}
