import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Layout = props => {
  return (
    <div className="flex-wrapper">
      <div>
        <Header />
        {props.children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
