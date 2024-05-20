import mongoose, {Schema} from 'mongoose';

const ComfortSchema = mongoose.Schema({
    nameComfort: {
        type: String,
        unique: true,
        require: true
    },
    idHotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: [true, "Enter a valid idHotel"]
    }
})

ComfortSchema.methods.toJSON = function(){
    const { __v, _id, ...comfort} = this.toObject();
    comfort.uid = _id;
    return comfort;
}

export default mongoose.model('Comfort', ComfortSchema)