import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pillar: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    places: {
        type: Number,
        required: true,
    },
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);

export default Class;