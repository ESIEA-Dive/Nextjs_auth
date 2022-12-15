import mongoose from "mongoose";

const Schema = mongoose.Schema;

const joinCourseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
});

const JoinCourse = mongoose.models.JoinCourse || mongoose.model("JoinCourse", joinCourseSchema);

export default JoinCourse;