import { response, request } from "express"
import bcryptjs from "bcryptjs"
import Event from "./event.model"

export const getEvents = async (req, res) => {
    const {start, end} = req.query;
    const query = {state: true};

    const [total, events] = await Primise.all([
        Event.countDocuments(query),
        Event.find(query)
        .skip(Number(start))
        .limit(Number(end))
    ]);

    res.status(200).json({
        total, events
    })

}


const postEvents = async (req, res) => {
    const {nameEvent, description, dateEvent, idHotel, idServicio, idUser} = req.body;

    const event = new Event({nameEvent, description, dateEvent, idHotel, idServicio, idUser});

    await event.save();

    res.status(200).json({
        event
    });
}


export const getEventById = async (req, res) => {
    const {id} = req.params;
    const event = await Event.findOne({_id: id});

    res.status(200).json({
        event
    })
}

export const putEvent = async (req, res) => {
    const {id} = req.params;    
    const {_id, ...resto} = req.body;

    await Event.findByIdAndUpdate(id, resto);

    const event = await Event.findOne({_id: id});

    res.status({
        msg: "Updated dates",
        event
    });

}


export const deleteEvent = async (req, res) => {
    const {id} = req.params;

    const event = await Event.findByIdAndUpdate(id, {state: false});
    const delteEvent = req.event;

    res.status(200).json({
        msg: "Event to delete",
        event,
        deleteEvent
    });
}