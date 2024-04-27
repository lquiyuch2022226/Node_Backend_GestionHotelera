import mongoose from "mongoose"

const eventSchema = mongoose.Schema({

    nameEvent: {
        type: String,
        required: [true, "Enter a name about event"]
    },

    description: {
        type: String,
        required: [true, "Enter a description"]
    },

    dateEvent: {
        type: Date,
        required: [true, "Enter a date"]
    },

    idHotel: {
        type: String,
        required: [true, "Need a Id"]
    },

    idServicio: {
        type: String,
        required: [true, "We need a Id"],

    },

    idUser: {
        type: String,
        required: [true, "Need a Id"]
    },

    state: {
        type: Boolean,
        default: true
    }


})


export default mongoose.model("Event", eventSchema);