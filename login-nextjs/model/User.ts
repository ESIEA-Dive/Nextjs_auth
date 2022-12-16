import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 5,
  },
  image: {
    type: String,
  },
  filledForm: {
    type: Boolean
  },
  status: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;