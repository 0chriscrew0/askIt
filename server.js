const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const async = require("async");
const path = require("path");
require("dotenv").config();

const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const isAuth = require("./middleware/isAuth");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

// Mongo URI
const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-vqy2w.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/client", "build", "index.html"));
  });
}

// Create Mongo connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    const port = 5000 || process.env.PORT;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch(err => console.log(err));
