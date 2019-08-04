const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question"
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Answer", answerSchema);
