import mongoose, {Schema} from 'mongoose';

const OpinionSchema = mongoose.Schema({
    description: {
        type: String,
        required: [true, "Enter a description"]
    },
    numStars:{
        type: Number,
        required: true
    },
    idHotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: [true, "Enter a valid idHotel"]
    },
    idUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Enter a valid idUser"]
    }
})

OpinionSchema.methods.toJSON = function(){
    const { __v, _id, ...opinion} = this.toObject();
    opinion.uid = _id;
    return opinion;
}

export default mongoose.model('Opinion', OpinionSchema)