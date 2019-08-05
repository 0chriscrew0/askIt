import React, { Component } from "react";
import isEmpty from "../../utils/is-empty";
import AuthContext from "../../context/Auth-Context";
import { Link } from "react-router-dom";

import Spinner from "../Spinner";
import Backdrop from "../Backdrop";
import Modal from "../Modal";
import SingleAnswer from "../Answers/SingleAnswer";

class SingleQuestion extends Component {
  state = {
    question: {
      creator: {},
      answers: []
    },
    answering: false,
    isLoading: false
  };

  constructor(props) {
    super(props);

    this.bodyEl = React.createRef();
  }

  static contextType = AuthContext;

  fetchQuestion() {
    this.setState({ isLoading: true });
    const { questionId } = this.props.match.params;

    const requestBody = {
      query: `
        query {
          singleQuestion(questionId:"${questionId}") {
            _id
            title
            description
            date
            answers {
              _id
              creator {
                _id
                username
              }
              createdAt
              body
            }
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
        const question = resData.data.singleQuestion;
        this.setState({
          question,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.fetchQuestion();
  }

  answerClick = () => {
    this.setState({
      answering: true
    });
  };

  onModalCancel = () => {
    this.setState({
      answering: false
    });
  };

  onModalConfirm = async () => {
    const body = this.bodyEl.current.value;
    console.log(body);
    const questionId = this.state.question._id;
    console.log(questionId);

    if (body.trim().length === 0) {
      return;
    }

    const createdAt = new Date().toISOString();
    console.log(createdAt);

    const requestBody = {
      query: `
        mutation {
          answerQuestion(answerInput:{questionId:"${questionId}", body:"${body}", createdAt:"${createdAt}"}) {
            _id
            createdAt
            body
            creator {
              username
            }
          }
        }
      `
    };

    const token = this.context.token;

    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      });
      if (res.status !== 200 && res.status !== 201) {
        console.log(res);
        throw new Error("Failed!");
      }
      const resData = await res.json();
      console.log(resData);
      this.setState({ answering: false });
      this.fetchQuestion();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.answering && <Backdrop />}
        {this.state.answering && (
          <Modal
            title="Answer this question"
            cancel
            confirm
            onCancel={this.onModalCancel}
            onConfirm={this.onModalConfirm}
          >
            <form>
              <div className="form-group">
                <label htmlFor="body">Your Answer</label>
                <textarea
                  name="body"
                  ref={this.bodyEl}
                  className="form-control"
                  id="body"
                  placeholder="Enter your answer for this question"
                />
              </div>
            </form>
          </Modal>
        )}
        <div className="container">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div>
              <div className="card mt-3 border-0">
                <div className="card-header bg-primary text-white">
                  <span>
                    <strong>{this.state.question.title}</strong>
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text">{this.state.question.description}</p>

                  <p className="card-title text-muted">
                    Asked by{" "}
                    {this.state.question.creator._id === this.context.userId
                      ? "You"
                      : this.state.question.creator.username}{" "}
                    on {new Date(this.state.question.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <hr />

              {this.context.userId ? (
                this.state.question.creator._id === this.context.userId ? (
                  <div />
                ) : (
                  <input
                    type="button"
                    value={
                      isEmpty(this.state.question.answers)
                        ? "Be the first to answer"
                        : "Answer Question"
                    }
                    onClick={this.answerClick}
                    className="btn btn-sm btn-outline-primary my-3"
                  />
                )
              ) : (
                <div>
                  Please <Link to="/login">login</Link> to answer this question.
                </div>
              )}

              {isEmpty(this.state.question.answers) ? (
                <h1 className="text-center display-5 my-5">
                  No Answers Yet...
                </h1>
              ) : (
                <div className="single--question__answers my-4">
                  <h4 className="display-5">Answers</h4>
                  {this.state.question.answers.map(answer => (
                    <SingleAnswer
                      key={answer._id}
                      id={answer._id}
                      body={answer.body}
                      creator={answer.creator}
                      createdAt={answer.createdAt}
                      currentUserId={this.context.userId}
                      token={this.context.token}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default SingleQuestion;
