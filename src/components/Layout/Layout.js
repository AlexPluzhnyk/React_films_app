import React from "react";

import Header from "./Header/Header";

import "./style.scss";

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="main-content">{children}</main>
  </div>
);

export default Layout;
