import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth-Context";

class CreateQuestion extends Component {
  static contextType = AuthContext;

  createQuestion = async values => {
    const { title, description } = values;

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
      const res = await fetch("/graphql", {
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
        <h4 className="display-5">New Question</h4>
        <hr className="questions-line mb-4 mt-0" />

        <Formik
          initialValues={{
            title: "",
            description: ""
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .max(20, "Title must not exceed 20 chracters")
              .required("Question must have a title"),
            description: Yup.string().required(
              "Question must have a description"
            )
          })}
          onSubmit={this.createQuestion}
          render={({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field
                  name="title"
                  type="text"
                  className={`form-control ${touched.title &&
                    errors.title &&
                    "is-invalid"}`}
                  placeholder="Enter the title for your question"
                />
                {touched.title && errors.title && (
                  <p className="text-danger pt-1">{errors.title}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="details">Description</label>
                <Field
                  component="textarea"
                  name="description"
                  rows={4}
                  className={`form-control ${touched.description &&
                    errors.description &&
                    "is-invalid"}`}
                  placeholder="Enter any additional details"
                />
                {touched.description && errors.description && (
                  <p className="text-danger pt-1">{errors.description}</p>
                )}
              </div>
              <button type="submit" className="btn btn-block btn-primary">
                Submit
              </button>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default withRouter(CreateQuestion);
