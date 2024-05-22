import { response, request } from "express";
//import bcryptjs from "bcryptjs"
import Reservation from './/reservation.model.js';
import Room from "../room/room.model.js"


export const getReservations = async (req = request, res = response) => {
    const { start, end } = req.query;
    const query = { state: true }

    const [total, reservations] = await Promise.all([
        Reservation.countDocuments(query),
        Reservation.find(query)
            .skip(Number(start))
            .limit(Number(end))
    ])


    res.status(200).json({
        total, reservations
    })
}


export const postReservation = async (req, res) => {
    const { dateStart, dateFinish, idHabitacion, idUser } = req.body;
    const reservation = new Reservation({dateStart, dateFinish, idHabitacion, idUser});

    const room = await Room.findOne({_id: idHabitacion})

    if(!room){
        res.status(404).json({
            msg: "Did not find"
        })
    }

    const _idHab = room.available = false;

    await room.save();

    await reservation.save();

    res.status(200).json({
        reservation
    })
}


export const getReservationById = async (req, res) => {
    const { id } = req.params
    const reservation = await Reservation.findOne({ _id: id })

    res.status(200).json({
        reservation
    })

}


export const putReservation = async (req, res) => {
    const { id } = req.params
    const { _id, ...resto } = req.body

    await Reservation.findByIdAndUpdate(id, resto);

    const reservation = await Reservation.findOne({ _id: id });

    res.status(200).json({
        msg: 'Updated Reservation',
        reservation
    });
}


export const deleteReservation = async (req, res) => {
    const {id} = req.params
    const reservation = await Reservation.findByIdAndUpdate(id, {state : false})
    const dropUser = req.reservation
    res.status(200).json({
        msg: "Reservation to delete",
        reservation,
        dropUser
    })
}