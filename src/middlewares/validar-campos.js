import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    console.log(error)
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    next();
}