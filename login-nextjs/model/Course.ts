import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    userImage: {
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

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;