import mongoose from "mongoose";

const collectionName = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true
    },
});

const ticketsModel = mongoose.model(collectionName, ticketSchema);
export default ticketsModel;