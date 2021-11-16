import React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div>
        <Sidebar />
      </div>
      <div>
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
