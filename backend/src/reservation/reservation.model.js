import mongoose from "mongoose"

const ReservationSchema = mongoose.Schema({

    dateStart: {
        type: Date,
        Date: false,
        required: [true, "Enter a date"],
    },

    dateFinish: {
        type: Date,
        required: [true, "Enter end date"]
    },

    state: {
        type: Boolean,
        default: true
    },

    idHabitacion: {
        type: String,
        required: [true, "Enter a valid id"]
    },

    idUser: {
        type: String,
        required: [true, "Enter a valid idUser"]
    }

})
  
export default mongoose.model('User', UserSchema);