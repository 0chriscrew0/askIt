import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./context/Auth-Context";

import Layout from "./HOC/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Questions from "./components/Questions";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CreateQuestion from "./components/Questions/CreateQuestion";
import SingleQuestion from "./components/Questions/SingleQuestion";

class Routes extends Component {
  state = {
    userId: null,
    token: null
  };

  login = (userId, token, tokenExp) => {
    this.setState({
      userId,
      token
    });
  };

  logout = () => {
    this.setState({
      userId: null,
      token: null
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout
        }}
      >
        <Layout>
          <Switch>
            {this.state.token && <Redirect from="/" to="/questions" exact />}
            {this.state.token && (
              <Redirect from="/about" to="/questions" exact />
            )}
            {this.state.token && (
              <Redirect from="/login" to="/questions" exact />
            )}
            {this.state.token && (
              <Redirect from="/register" to="/questions" exact />
            )}

            {!this.state.token && <Route path="/login" component={Login} />}
            {!this.state.token && (
              <Route path="/register" component={Register} />
            )}

            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/questions" component={Questions} />
            <Route path="/question/:questionId" component={SingleQuestion} />
            {this.state.token && (
              <Route path="/new-question" component={CreateQuestion} />
            )}
            {!this.state.token && <Redirect to="/login" exact />}
          </Switch>
        </Layout>
      </AuthContext.Provider>
    );
  }
}

export default Routes;
