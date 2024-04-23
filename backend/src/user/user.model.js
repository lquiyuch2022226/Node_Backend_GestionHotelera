import mongoose, {Schema} from 'mongoose';

const UserSchema = mongoose.Schema({

    email: {
        type: String,
        unique: true
    },

    userName: {
        type: String
    },

    lastName: {
        type: String
    },

    password: {
        type: String
    },

    estado : {
        type: Boolean,
        default: true,
    },

    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "TENANT_ROLE"],
    }

})

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema)