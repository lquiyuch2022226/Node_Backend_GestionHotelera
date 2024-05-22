import mongoose from "mongoose"

const roomSchema = mongoose.Schema({

    type: {
        type: String,
        required: [true, "Enter a hotel type"]
    },

    capacity: {
        type: Number,
        required: [true, "Enter a capacity"]
    },

    price: {
        type: Number,
        required: [true, "Enter a price"]
    },

    availableDate: {
        type: Date,
        required: [true, ""]
    },

    available: {
        type: Boolean,
        default: true
    },

    idHotel: {
        type: String,
        required: [true, "Need a Id Hotel"]
    },
    state: {
        type: Boolean,
        default: true
    }

})

export default mongoose.model("Room", roomSchema)