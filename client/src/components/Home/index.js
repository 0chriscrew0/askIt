import React, { Component } from "react";

import Hero from "./Hero";
import SiteInfo from "./SiteInfo";
import Features from "./Features";
import GetStarted from "./GetStarted";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Hero />
        <SiteInfo />
        <Features />
        <GetStarted />
      </div>
    );
  }
}

export default Home;
