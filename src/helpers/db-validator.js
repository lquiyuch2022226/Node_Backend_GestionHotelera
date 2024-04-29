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
    }
}