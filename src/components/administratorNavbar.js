import * as React from "react";
import { Input } from "baseui/input";
import { Search } from "baseui/icon";

import "./administratorNavbar.css";

export default function AdministratorNavbar(props) {
  return (
    <div className="administratorNavbarDiv">
      <div className="navbarItemsDiv">
        <p className="brand">BENMART</p>
        <p className="navbarItems">review order</p>
        <p className="navbarItems">order</p>
        <p className="navbarItems">account</p>
      </div>
      <div>
        <span>
          <Input
            startEnhancer={<Search size="2rem" />}
            placeholder="search here"
          />
        </span>
      </div>
    </div>
  );
}
