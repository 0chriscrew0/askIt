import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

class Register extends Component {
  onSubmit = values => {
    const { username, email, password, password2 } = values;

    const requestBody = {
      query: `
        mutation {
          createUser(userInput: {username: "${username}", email: "${email}", password: "${password}", password2: "${password2}"}) {
            _id
            username
            email
            password
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
          throw new Error("Failed!");
        }

        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { errors, touched, isSubmitting } = this.props;
    return (
      <div className="register-page">
        <div className="container my-5">
          <h2 className="mb-4">Register</h2>
          <Form>
            <div className="form-group">
              <Field
                name="username"
                type="text"
                className={`form-control ${touched.username &&
                  errors.username &&
                  "is-invalid"}`}
                placeholder="Create Username"
              />
              {touched.username && errors.username && (
                <p className="text-danger pt-1">{errors.username}</p>
              )}
            </div>
            <div className="form-group">
              <Field
                name="email"
                type="email"
                className={`form-control ${touched.email &&
                  errors.email &&
                  "is-invalid"}`}
                placeholder="Enter email"
              />
              {touched.email && errors.email && (
                <p className="text-danger pt-1">{errors.email}</p>
              )}
            </div>
            <div className="form-group">
              <Field
                name="password"
                type="password"
                className={`form-control ${touched.password &&
                  errors.password &&
                  "is-invalid"}`}
                placeholder="Password"
              />
              {touched.password && errors.password && (
                <p className="text-danger pt-1">{errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <Field
                name="password2"
                type="password"
                className={`form-control ${touched.password2 &&
                  errors.password2 &&
                  "is-invalid"}`}
                placeholder="Confirm Password"
              />
              {touched.password2 && errors.password2 && (
                <p className="text-danger pt-1">{errors.password2}</p>
              )}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-sm btn-primary"
            >
              Submit
            </button>
          </Form>

          <div className="my-5">
            <label htmlFor="register">Already have an account?</label>
            <Link
              to="/login"
              className="btn btn-sm btn-outline-primary mx-3"
              id="password"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues({ username, lastname, email, password, password2 }) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      password2: password2 || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(2, "Username must exceed 2 characters")
      .max(20, "Username must not exceed 20 characters")
      .required("Enter a username"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Enter your email"),
    password: Yup.string()
      .min(6, "Password must be a minum of 6 characters")
      .required("Please enter a password"),
    password2: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please retype your password")
  }),
  handleSubmit(values, { props }) {
    const { username, email, password, password2 } = values;

    const requestBody = {
      query: `
        mutation {
          createUser(userInput: {username: "${username}", email: "${email}", password: "${password}", password2: "${password2}"}) {
            _id
            username
            email
            password
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
          throw new Error("Failed!");
        }

        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  }
})(Register);
