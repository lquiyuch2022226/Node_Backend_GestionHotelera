import User from "../user/user.model.js"
import Role from '../roles/role.model.js';

export const isValidRole = async (role = '') => {
    const existRol = await Role.findOne({role});
    if (!existRol){
        throw new Error(`${role} Role does not exist in the database!`);
    }
}

export const existeEmail = async (email = '') => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado`)
    }
}

export const existeUsuarioById = async (id = '') =>{
    const existeUsuario = await User.findById(id)
    if(!existeUsuario){
        throw new Error(` el ID: ${id} no existe` )
    }
}