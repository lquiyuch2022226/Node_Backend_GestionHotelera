import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
    nameHotel: {
        type: String,
        required: [true, "Enter a name"]
    },

    address: {
        type: String,
        required: [true, "Enter a addresss"]
    },

    category: {
        type: String,
        required: [true, "Enter a category"]
    },

    services: {
        type: String,
        required: [true, "Enter a service"]
    },

    numStars: {
        type: String,
        required: [true, "Enter the numStars"]
    },

    idUserAdmin: {
        type: String,
        required: [true, "Enter a Id"]
    },

    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Hotel", hotelSchema);