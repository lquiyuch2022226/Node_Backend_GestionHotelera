import { response, request } from "express";
import bcryptjs from "bcryptjs";
import User from "./user.model.js";

// Obtener usuarios con paginación
export const getUsers = async (req = request, res = response) => {
    const { start, end } = req.query;
    const query = { estado: true };

    try {
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(start))
                .limit(Number(end))
        ]);

        res.status(200).json({
            total,
            users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Crear un nuevo usuario
export const postUsers = async (req, res) => {
    const { email, userName, lastName, password, role } = req.body;
    const user = new User({ email, userName, lastName, password, role });

    try {
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: id });

        res.status(200).json({
            user
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Obtener usuario por email
export const getUserEmail = async (req, res) => {
    const { _email } = req.params;

    try {
        const user = await User.findOne({ email: _email });

        res.status(200).json({
            role: user.role,
            idUser: user._id
        });
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Actualizar usuario
export const putUser = async (req, res = response) => {
    const { id } = req.params;
    const { password, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, resto, { new: true });

        res.status(200).json({
            msg: 'Updated user!!',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Eliminar usuario (cambiar estado a false)
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, { estado: false });
        const authenticatedUser = req.user;

        res.status(200).json({
            msg: 'User successfully removed',
            user,
            authenticatedUser
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};
