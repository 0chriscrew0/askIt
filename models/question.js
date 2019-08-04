const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    requried: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer"
    }
  ]
});

module.exports = mongoose.model("Question", questionSchema);
