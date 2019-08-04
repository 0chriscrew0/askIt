import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

const GetStarted = () => {
  return (
    <div className="get-started pt-4">
      <div className="jumbotron mb-0 bg-primary">
        <div className="container">
          <div className="row">
            <Fade>
              <div className="col-sm-12 my-3">
                <h4 className="get-started-heading display-4 text-white">
                  Sign up now
                </h4>
                <p className="get-started-subheading lead">It's free!</p>
              </div>
            </Fade>

            <Fade>
              <div className="col-sm-12 my-3">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Asperiores ex iure perspiciatis autem esse repellat architecto
                  quis voluptas eius natus.
                </p>
              </div>
            </Fade>

            <Zoom>
              <div className="col-sm-12 my-3">
                <Link className="btn btn-lg btn-outline-white" to="/register">
                  Get Started
                </Link>
              </div>
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
