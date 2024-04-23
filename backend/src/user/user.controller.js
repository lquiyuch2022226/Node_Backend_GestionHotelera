import { response, request } from "express"
import bcryptjs from "bcryptjs"
import User from "./user.model.js"

export const getUsers = async (req = request, res = response) => {

    const {star, end} = req.query
    const query = {estado: true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(star))
        .limit(Number(end))
    ])

    res.status(200).json({
        total,
        users
    })

}


export const postUsers = async (req, res) =>{

    const {email, userName, lastName, password, role} = req.body;
    const user = new User({email, userName, lastName, password, role})

    const salt = bcryptjs.getSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await user.save()

    res.status(200).json({
        user
    })

}

export const getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    
    res.status(200).json({
        user
    })
}

export const putUser = async (req, res = response) => {
    const { id } = req.params;
    const {_id, password, userName, lastName, ...resto} = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, resto);

    const user = await User.findOne({_id: id});

    res.status(200).json({
        msg: 'Updated user!!',
        user
    });
}


export const deleteUser = async (req, res) => {
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, { estado: false});
    const authenticatedUser = req.user;

    res.status(200).json({msg:'User to delete:', user, authenticatedUser });
}