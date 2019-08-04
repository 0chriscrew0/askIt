import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.usernameEl = React.createRef();
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.password2El = React.createRef();
  }

  onSubmit = event => {
    event.preventDefault();

    const username = this.usernameEl.current.value;
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    const password2 = this.password2El.current.value;

    console.log(username, email, password, password2);

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
    return (
      <div className="register-page">
        <div className="container my-5">
          <h2 className="mb-4">Register</h2>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                ref={this.usernameEl}
                className="form-control"
                id="username"
                placeholder="Create Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                name="email"
                type="email"
                ref={this.emailEl}
                className="form-control"
                id="email"
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
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                name="password2"
                type="password"
                ref={this.password2El}
                className="form-control"
                id="password2"
                placeholder="Confirm Password"
              />
            </div>
            <button type="submit" className="btn btn-sm btn-primary">
              Submit
            </button>
          </form>

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

export default Register;
