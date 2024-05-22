import mongoose, {Schema} from 'mongoose';

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    role:{
        type: String,
        default: 'USER_ROLE'
    },
    idHotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
    },
    status:{
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema)