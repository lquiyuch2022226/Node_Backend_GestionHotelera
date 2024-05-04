import mongoose from "mongoose"

const EventReservationSchema = mongoose.Schema({

    nameEvent: {
        type: String,
        required: [true, "Enter a name"],
    },

    description: {
        type: String,
        required: [true, "Enter a description"]
    },
    dateEvent: {
        type: Date,
        required: [true, "Enter a date"]
    },
    idEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, "Enter a valid idUser"]
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Enter a valid idUser"]
    }

})
  
export default mongoose.model('EventReservationSchema', EventReservationSchema);