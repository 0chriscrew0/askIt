import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/Auth-Context";

class Login extends Component {
  static contextType = AuthContext;

  onSubmit = values => {
    const { email, password } = values;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        query {
          login(email:"${email}", password:"${password}") {
            userId
            token
            tokenExp
          }
        }
      `
    };

    fetch("/graphql", {
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
        const { userId, token, tokenExp } = resData.data.login;
        if (token) {
          this.context.login(userId, token, tokenExp);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="login-page">
        <div className="container my-5">
          <h2 className="mb-4">Login</h2>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={this.onSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Enter a valid email")
                .required("Enter your email"),
              password: Yup.string().required("Please enter a password")
            })}
            render={({ touched, errors, isSubmitting }) => (
              <Form>
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-sm btn-primary"
                >
                  Submit
                </button>
              </Form>
            )}
          />

          <div className="my-4">
            <label htmlFor="register">Need an account?</label>
            <Link
              to="/register"
              className="btn btn-sm btn-outline-primary mx-2"
              id="password"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
