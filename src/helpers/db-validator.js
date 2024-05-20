<<<<<<< HEAD
import User from "../user/user.model.js"
import Role from '../roles/role.model.js';

export const isValidRole = async (role = '') => {
    const existRol = await Role.findOne({role});
    if (!existRol){
        throw new Error(`${role} Role does not exist in the database!`);
    }
}

export const existingEmail = async (correo = '') =>{

    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`${email} Email is already in the database!`)
    }

}

export const userIsAlreadyExist = async (id = '') => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`${user} User is already in the database!`)
=======
import User from "../user/user.model.js";
import Room from "../room/room.model.js";
import Hotel from "../hotel/hotel.model.js";
import Reservation from "../reservation/reservation.model.js";



export const existeEmail = async (email = '') => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado`)
    }
}

export const existeUserWithThisEmail = async (email = '') => {
    const existe = await User.findOne({email})
    if(!existe){
        throw new Error(`The user with email:  ${email} do not exist in data base`)
    }
}

export const existeUsuarioById = async (id = '') =>{
    const existeUsuario = await User.findById(id)
    if(!existeUsuario){
        throw new Error(` el ID: ${id} no existe` )
    }
}

export const existRoomById = async (id = '') =>{
    const existRoom = await Room.findById(id)
    if(!existRoom){
        throw new Error(`The room with this id: ${id} don't exist`)
    }
}


export const existHotelById = async (id = '') =>{
    const existHotel = await Hotel.findById(id)
    if(!existHotel){
        throw new Error(` el ID: ${id} no existe` )
    }
}

export const existeRoomById = async (id = '') =>{
    const existRoom = await Room.findById(id)
    if(!existHotel){
        throw new Error(` el ID: ${id} no existe` )
    }
}


export const existReservationById = async(id = '') => {
    const existReservation = await Reservation.findById(id)
    if(!existReservation){
        throw new Error(` el ID: ${id} no existe` )
>>>>>>> develop
    }
}