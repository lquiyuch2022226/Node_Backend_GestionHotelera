import mongoose from "mongoose"

const EventReservationSchema = mongoose.Schema({

    idEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, "Enter a valid idUser"]
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

})

export default mongoose.model('EventReservationSchema', EventReservationSchema);