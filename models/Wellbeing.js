const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WellbeingSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
});

const Wellbeing = mongoose.model("Wellbeing", WellbeingSchema);

module.exports = Wellbeing;
