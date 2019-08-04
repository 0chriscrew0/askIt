import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthContext from "../../context/Auth-Context";

class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.titleEl = React.createRef();
    this.descriptionEl = React.createRef();
  }

  static contextType = AuthContext;

  createQuestion = async event => {
    event.preventDefault();

    const title = this.titleEl.current.value;
    const description = this.descriptionEl.current.value;

    if (title.trim().length === 0 || description.trim().length === 0) {
      return;
    }

    const date = new Date().toISOString();

    const requestBody = {
      query: `
        mutation {
          createQuestion(questionInput: {title: "${title}", description: "${description}", date: "${date}"}) {
            _id
            title
            description
            date
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
    } catch (err) {
      console.log(err);
    }

    this.props.history.push("/questions");
  };

  render() {
    return (
      <div className="container">
        <h4 className="display-4">New Question</h4>
        <hr className="questions-line mb-4" />

        <form onSubmit={this.createQuestion}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              ref={this.titleEl}
              className="form-control"
              id="title"
              placeholder="Enter the title for your question"
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Description</label>
            <textarea
              name="description"
              rows={4}
              ref={this.descriptionEl}
              className="form-control"
              id="description"
              placeholder="Enter any additional details"
            />
          </div>
          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateQuestion);
