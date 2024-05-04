import EventReservation from './eventReservation.model.js';
import User from '../user/user.model.js';

export const eventReservationPost = async (req, res) => {
    const { nameEvent, description, dateEvent, idEvent, idUser } = req.body;

    const event = new EventReservation({ nameEvent, description, dateEvent, idEvent, idUser });

    await event.save();

    res.status(200).json({
        event
    });
}

export const eventsGet = async (req, res) => {
    const { limit, skip } = req.query;
    const query = {};

    const [total, events] = await Promise.all([
        EventReservation.countDocuments(query),
        EventReservation.find(query)
            .populate({
                path: 'idEvent',
                select: 'eventName eventDescription -_id'
            })
            .populate({
                path: 'idUser',
                select: 'username email -_id'
            })
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        events
    });
}

export const eventGetByName = async (req, res) => {
    const { name } = req.params;
    const event = await EventReservation.findOne({ nameEvent: name });

    if (!event) {
        res.status(404).json({
            msg: 'Event not found :('
        });
        return;
    }

    res.status(200).json({
        event
    });
}

export const eventPut = async (req, res) => {
    const { name } = req.params;
    const updatedFields = req.body;

    const event = await EventReservation.findOne({ nameEvent: name });
  
    if (!event) {
        res.status(404).json({
            msg: "Event not found",
        });
        return;
    }

    const updatedEvent = await EventReservation.findByIdAndUpdate(event._id, updatedFields, { new: true });

    res.status(200).json({
        msg: 'Event updated successfully',
        updatedEvent
    });
}

export const eventDelete = async (req, res) => {
    const { name } = req.params;

    const event = await EventReservation.findOne({ nameEvent: name });

    if (!event) {
        res.status(404).json({
            msg: "Event not found",
        });
        return;
    }

    const deletedEvent = await EventReservation.findByIdAndDelete(event._id);

    res.status(200).json({
        msg: 'Event deleted successfully',
        deletedEvent
    });
}
