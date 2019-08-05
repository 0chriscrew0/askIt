import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/Auth-Context";
import QuestionPreview from "./QuestionPreview";
import Spinner from "../Spinner";

class Questions extends Component {
  state = {
    questions: [],
    isLoading: false
  };
  isActive = true;

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          questions {
            _id
            title
            description
            date
            creator {
              _id
              username
            }
          }
        }
      `
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log(res);
          throw new Error("Failed!");
        }

        return res.json();
      })
      .then(resData => {
        const questions = resData.data.questions;
        if (this.isActive) {
          this.setState({ questions: questions.reverse(), isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    const questionsList = this.state.questions.map(question => {
      return (
        <div key={question._id}>
          <QuestionPreview
            id={question._id}
            title={question.title}
            description={question.description}
            date={question.date}
            creator={question.creator}
            currentUserId={this.context.userId}
          />
        </div>
      );
    });

    return (
      <div className="question-page">
        <div className="w-100 bg-primary">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="display-5 pl-4 text-white">Questions</h4>
              <Link
                to="/new-question"
                className="btn btn-sm ml-3 my-3 btn-outline-white"
              >
                Ask a new Question
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <hr className="questions-line mb-4 mt-0 pt-0" />

          {this.state.isLoading ? <Spinner /> : <div>{questionsList}</div>}
        </div>
      </div>
    );
  }
}

export default Questions;
