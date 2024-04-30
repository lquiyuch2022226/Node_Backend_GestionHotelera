import { response, request } from "express"
import bcryptjs from "bcryptjs"
import User from "./user.model.js"

export const usuariosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { status: true };

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

export const getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    
    res.status(200).json({
        user
    })
}

export const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, role, status, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioActualizado = await User.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: 'This user was UPDATED:',
        usuarioActualizado
    });

}

export const userDelete = async (req, res) => {
    const { id } = req.params;
    const usuario = await User.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        msg: 'This user was DELETED:',
        usuario,
    });
}