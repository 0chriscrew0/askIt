import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const SiteInfo = () => {
  return (
    <div className="site-info py-3">
      <div className="jumbotron bg-primary">
        <div className="container">
          <Fade>
            <div className="row">
              <div className="col-sm-12">
                <h4 className="site-info-heading text-white">Site Info</h4>
              </div>
              <div className="col-sm-12">
                <p className="site-info-desc lead">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere natus, maiores voluptatum illo earum repellendus quia
                  nemo nihil quam assumenda ratione adipisci dolor pariatur
                  alias perferendis error odit tenetur. Perferendis dignissimos
                  minima impedit sint consectetur nam dolor, aperiam aspernatur
                  et.
                </p>
                <p className="site-info-desc lead">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  accusantium est nulla ex fugit ducimus itaque facilis, quia
                  impedit porro?
                </p>
              </div>
              <div className="col-sm-12">
                <Link className="btn btn-sm btn-outline-light" to="/about">
                  Learn More
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default SiteInfo;
