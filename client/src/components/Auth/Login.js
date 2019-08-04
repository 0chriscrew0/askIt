import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth-Context";

class Login extends Component {
  constructor(props) {
    super(props);

    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  static contextType = AuthContext;

  onSubmit = event => {
    event.preventDefault();

    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    console.log(email, password);

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

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                name="email"
                type="email"
                ref={this.emailEl}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                ref={this.passwordEl}
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-sm btn-primary">
              Submit
            </button>
          </form>

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
