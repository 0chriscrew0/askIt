const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Answer {
  _id: ID!
  question: Question!
  body: String!
  creator: User!
  createdAt: String!
  updatedAt: String
}

type Question {
  _id: ID!
  title: String!
  description: String!
  date: String!
  creator: User!
  answers: [Answer!]
}

type User {
  _id: ID!
  username: String!
  email: String!
  password: String
  createdQuestions: [Question!]
  answers: [Answer!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExp: Int!
}

input AnswerInput {
  questionId: ID!
  body: String!
  createdAt: String!
}

input QuestionInput {
  title: String!
  description: String!
  date: String!
}

input UserInput {
  username: String!
  email: String!
  password: String!
  password2: String!
}

type RootQuery {
  singleQuestion(questionId: ID!): Question!
  questions: [Question!]!
  answers: [Answer!]!
  login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createQuestion(questionInput: QuestionInput): Question
  createUser(userInput: UserInput): User
  answerQuestion(answerInput: AnswerInput): Answer!
  deleteAnswer(answerId: ID!): Question! 
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
