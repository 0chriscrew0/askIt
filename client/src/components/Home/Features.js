import React from "react";
import Fade from "react-reveal/Fade";

import image1 from "../../resources/images/features1.jpg";
import image2 from "../../resources/images/features2.jpg";
import image3 from "../../resources/images/features3.jpg";
import image4 from "../../resources/images/features4.jpg";

const Features = () => {
  return (
    <div className="features pb-3">
      <div className="container">
        <Fade>
          <h3 className="pb-3">Features</h3>
          <div className="row m-auto">
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="card my-3 mx-auto">
                <img
                  style={{ height: "200px", width: "100%", display: "block" }}
                  src={image1}
                  alt="sheet music"
                />
                <h3 className="card-header">Card header</h3>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <h6 className="card-subtitle">Support card subtitle</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="card my-3 mx-auto">
                <img
                  style={{ height: "200px", width: "100%", display: "block" }}
                  src={image2}
                  alt="sheet music"
                />
                <h3 className="card-header">Card header</h3>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <h6 className="card-subtitle">Support card subtitle</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="card my-3 mx-auto">
                <img
                  style={{ height: "200px", width: "100%", display: "block" }}
                  src={image3}
                  alt="sheet music"
                />
                <h3 className="card-header">Card header</h3>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <h6 className="card-subtitle">Support card subtitle</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="card my-3 mx-auto">
                <img
                  style={{ height: "200px", width: "100%", display: "block" }}
                  src={image4}
                  alt="sheet music"
                />
                <h3 className="card-header">Card header</h3>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <h6 className="card-subtitle">Support card subtitle</h6>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Features;
