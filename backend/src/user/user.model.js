import mongoose, { Schema } from 'mongoose'

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    name:{
        type: String
    },
    lastName:{
        type: String
    },
    role:{
        type: String,
        default: 'USER_ROLE'
    }
})

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
  }

export default mongoose.model('User', UserSchema)