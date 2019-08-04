import React from "react";
import Fade from "react-reveal/Fade";

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 mx-auto hero-title">
            <Fade cascade>
              <div>
                <h1 className="hero-heading display-5">Question Site</h1>
                <p className="hero-subheading lead">
                  Ask and Answer Questions Online
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      <Fade>
        <div className="hero-img col-xs-12" />
      </Fade>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <Fade>
              <p className="hero-desc lead">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus quas nulla provident itaque blanditiis doloremque
                voluptas nemo. Excepturi, dignissimos tempora!
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
