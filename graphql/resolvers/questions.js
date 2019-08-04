const { transformQuestion } = require("./merge");

const User = require("../../models/user");
const Question = require("../../models/question");

module.exports = {
  singleQuestion: async ({ questionId }) => {
    try {
      const question = await Question.findOne({ _id: questionId });
      return transformQuestion(question);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  questions: async () => {
    try {
      const questions = await Question.find();
      return questions.map(question => {
        return transformQuestion(question);
      });
    } catch (err) {
      throw err;
    }
  },
  createQuestion: async ({ questionInput }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const { title, description, date } = questionInput;
    const question = new Question({
      title,
      description,
      date: new Date(date),
      creator: req.userId
    });
    let createdQuestion;
    try {
      const result = await question.save();

      createdQuestion = transformQuestion(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdQuestions.push(question);
      await creator.save();

      return createdQuestion;
    } catch (err) {
      throw err;
    }
  }
};
