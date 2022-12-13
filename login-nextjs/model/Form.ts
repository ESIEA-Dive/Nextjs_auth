import mongoose from "mongoose";

const Schema = mongoose.Schema;

const formSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  qstUniversity: {
    type: String,
    required: true,
  },
  qstYear: {
    type: String,
    required: true,
  },
  qstSport: {
    type: String,
    required: true,
  },
  qstSex: {
    type: String,
    required: true,
  },
  qstIdol: {
    type: String,
    required: true,
  },
  qstEmotion1: {
    type: String,
    required: true,
  },
  qstEmotion2: {
    type: String,
    required: true,
  },
  qstEmotion3: {
    type: Number,
    required: true,
  },
  qstPhysical1: {
    type: String,
    required: true,
  },
  qstPhysical2: {
    type: String,
    required: true,
  },
  qstPhysical3: {
    type: String,
    required: true,
  },
  qstMental1: {
    type: String,
    required: true,
  },
  qstMental2: {
    type: String,
    required: true,
  },
  qstSpiritual1: {
    type: String,
    required: true,
  },
  qstSpiritual2: {
    type: String,
    required: true,
  },
  qstSocial1: {
    type: String,
    required: true,
  },
  qstSocial2: {
    type: String,
    required: true,
  },
  qstSocial3: {
    type: String,
    required: true,
  },
  qstEnvironmental1: {
    type: Number,
    required: true,
  },
  qstEnvironmental2: {
    type: String,
    required: true,
  },
  qstEnvironmental3: {
    type: String,
    required: true,
  },
  qstFinancial1: {
    type: Number,
    required: true,
  },
  qstFinancial2: {
    type: String,
    required: true,
  },
  qstFinancial3: {
    type: String,
    required: true,
  },
  qstOccupational1: {
    type: String,
    required: true,
  },
  qstOccupational2: {
    type: String,
    required: true,
  },
});

const Form = mongoose.models.Form || mongoose.model("Form", formSchema);

export default Form;