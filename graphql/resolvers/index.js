const authResolver = require("./auth");
const questionsResolver = require("./questions");
const answersResolver = require("./answers");

const rootResolver = {
  ...authResolver,
  ...questionsResolver,
  ...answersResolver
};

module.exports = rootResolver;
