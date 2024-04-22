import mongoose, { Schema } from 'mongoose'

const UserSchema = mongoose.Schema({
    nameHotel: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    category: {
        type: String
    },
    services: {
        type: [String]
    },
    numStars: {
        type: number
    },
    idUser: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'User'
        }]
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, numStars, _id, ...hotel } = this.toObject();
    usuario.uid = _id;
    return hotel;
}

export default mongoose.model('User', UserSchema)