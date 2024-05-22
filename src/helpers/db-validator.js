import User from "../user/user.model.js";
import Room from "../room/room.model.js";
import Hotel from "../hotel/hotel.model.js";
import Reservation from "../reservation/reservation.model.js";

// Validator to check if a role is valid
export const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`${role} Role does not exist in the database!`);
    }
};

// Validator to check if an email already exists in the database
export const existingEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`${email} Email is already in the database!`);
    }
};

// Validator to check if a user exists by their ID
export const existeUsuarioById = async (id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`User with ID ${id} does not exist in the database!`);
    }
};

// Validator to check if a room exists by its ID
export const existRoomById = async (id = '') => {
    const existRoom = await Room.findById(id);
    if (!existRoom) {
        throw new Error(`Room with ID ${id} does not exist in the database!`);
    }
};

// Validator to check if a hotel exists by its ID
export const existHotelById = async (id = '') => {
    const existHotel = await Hotel.findById(id);
    if (!existHotel) {
        throw new Error(`Hotel with ID ${id} does not exist in the database!`);
    }
};

// Validator to check if a reservation exists by its ID
export const existReservationById = async (id = '') => {
    const existReservation = await Reservation.findById(id);
    if (!existReservation) {
        throw new Error(`Reservation with ID ${id} does not exist in the database!`);
    }
};
