import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/Auth-Context";

const Header = () => (
  <AuthContext.Consumer>
    {context => {
      return (
        <nav
          className="navbar navbar-expand-md navbar-light bg-white"
          style={{ border: "none" }}
        >
          <div className="container">
            <div data-toggle="collapse" data-target=".navbar-collapse.show">
              <NavLink className="navbar-brand text-primary" to="/">
                AskIt
              </NavLink>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto my-2">
                {!context.token && (
                  <React.Fragment>
                    <li
                      className="nav-item px-3"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      <NavLink exact className="nav-link" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li
                      className="nav-item px-3"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      <NavLink className="nav-link" to="/about">
                        About
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}

                <li
                  className="nav-item px-3"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink className="nav-link" to="/questions">
                    Questions
                  </NavLink>
                </li>
                {!context.token && (
                  <li
                    className="nav-item px-3"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                  >
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                )}
                {context.token && (
                  <React.Fragment>
                    <li
                      className="nav-item px-3"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      <NavLink className="nav-link" to="/account">
                        Account
                      </NavLink>
                    </li>
                    <li
                      className="nav-item px-3"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      <NavLink className="nav-link" to="/answers">
                        Answers
                      </NavLink>
                    </li>
                    <li
                      className="nav-item px-3"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      <NavLink
                        className="nav-link"
                        to="/logout"
                        onClick={context.logout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
    }}
  </AuthContext.Consumer>
);
export default Header;
