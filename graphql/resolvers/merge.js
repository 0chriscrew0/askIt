const { dateToString } = require("../../utils/date");

const Question = require("../../models/question");
const Answer = require("../../models/answer");
const User = require("../../models/user");

const questions = async questionIds => {
  try {
    const questions = await Question.find({ _id: { $in: questionIds } });

    return questions.map(question => {
      return transformQuestion(question);
    });
  } catch (err) {
    throw err;
  }
};

const answers = async answerIds => {
  try {
    const answers = await Answer.find({ _id: { $in: answerIds } });

    return answers.map(answer => {
      return transformAnswer(answer);
    });
  } catch (err) {
    throw err;
  }
};

const singleQuestion = async questionId => {
  try {
    const question = await Question.findById(questionId);
    return transformQuestion(question);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdQuestions: questions.bind(this, user._doc.createdQuestions),
      answers: answers.bind(this, user._doc.answers)
    };
  } catch (err) {
    throw err;
  }
};

const transformQuestion = question => {
  return {
    ...question._doc,
    _id: question.id,
    date: dateToString(question._doc.date),
    creator: user.bind(this, question.creator),
    answers: answers.bind(this, question._doc.answers)
  };
};

const transformAnswer = answer => {
  return {
    ...answer._doc,
    _id: answer.id,
    creator: user.bind(this, answer.creator),
    question: singleQuestion.bind(this, answer.question),
    createdAt: dateToString(answer._doc.createdAt),
    updatedAt: dateToString(answer._doc.updatedAt)
  };
};

exports.transformQuestion = transformQuestion;
exports.transformAnswer = transformAnswer;
