import { response, request } from "express"
import bcryptjs from "bcryptjs"
import Event from "./event.model.js"

export const getEvents = async (req, res) => {
    const {start, end} = req.query;
    const query = {state: true};

    const [total, events] = await Promise.all([
        Event.countDocuments(query),
        Event.find(query)
        .skip(Number(start))
        .limit(Number(end))
    ]);

    res.status(200).json({
        total, events
    })

}



export const postEvents = async (req, res) => {
    try {
        const { nameEvent, description, dateEvent, idHotel, idServicio, idUser } = req.body;

        if (!nameEvent || !description || !dateEvent || !idHotel || !idServicio || !idUser) {
            return res.status(400).json({
                msg: 'Please provide all required fields'
            });
        }

        const event = new Event({ nameEvent, description, dateEvent, idHotel, idServicio, idUser });

        await event.save();

        res.status(200).json({
            event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'An error occurred while saving the event',
            error: error.message
        });
    }
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


export const eventsGetOnlyHotel = async (req, res) => {
    const { limite, desde } = req.query;
    const { idHotel } = req.params;
    const query = { state: true, idHotel: idHotel };

    const [total, events] = await Promise.all([
        Event.countDocuments(query),
        Event.find(query)
            .select('-state')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        events
    });
}