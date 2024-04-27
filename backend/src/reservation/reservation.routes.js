import {Router} from "express";
import {check} from "express-validator";

import {
    getReservations,
    getReservationById,
    postReservation,
    putReservation,
    deleteReservation
} from "./reservation.controller";

import {

} from "../helpers/db-validator.js";