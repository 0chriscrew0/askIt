const { transformAnswer, transformQuestion } = require("./merge");

const User = require("../../models/user");
const Question = require("../../models/question");
const Answer = require("../../models/answer");

module.exports = {
  answers: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const answers = await Answer.find();
      return answers.map(answer => {
        return transformAnswer(answer);
      });
    } catch (err) {
      throw err;
    }
  },
  answerQuestion: async ({ answerInput }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const { questionId, body, createdAt } = answerInput;
    const answer = new Answer({
      creator: req.userId,
      question: questionId,
      body: body,
      createdAt: new Date(createdAt)
    });
    let createdAnswer;
    try {
      const result = await answer.save();

      createdAnswer = transformAnswer(result);

      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error("User not found.");
      }
      creator.answers.push(answer);
      await creator.save();

      const question = await Question.findById(questionId);

      if (!question) {
        throw new Error("Question not found.");
      }

      question.answers.push(answer);
      await question.save();

      return createdAnswer;
    } catch (err) {
      throw err;
    }
  },
  deleteAnswer: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const answer = await Answer.findById(args.answerId).populate("question");
      const question = transformQuestion(answer.question);
      await Answer.deleteOne({ _id: args.answerId });
      return question;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
