import mongoose from "mongoose"

const RoomServicieAditionalSchema = mongoose.Schema({

    nameService: {
        type: String,
        required: [true, "Enter a name"],
    },
    description: {
        type: String,
        required: [true, "Enter a description"]
    },
    price: {
        type: Number,
        required: [true, "Enter a price"]
    },
    idHotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: [true, "Enter a valid idHotel"]
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Enter a valid idUser"]
    }

})
  
export default mongoose.model('RoomServicieAditional', RoomServicieAditionalSchema);