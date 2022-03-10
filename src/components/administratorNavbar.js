import * as React from "react";
import { Input } from "baseui/input";
import { Search } from "baseui/icon";

import "./administratorNavbar.css";

export default function AdministratorNavbar(props) {
  var [administratorNavbarExpanded, setAdministratorNavbarExpanded] =
    React.useState(false);
  var [
    administratorNavbarExpandedCurrentWidth,
    setAdministratorNavbarExpandedCurrentWidth,
  ] = React.useState(undefined);

  function handleClickBrandShowMobileView() {
    // navbarItemsDiv
    var nid = document.querySelector(":root");

    nid.style.setProperty("--navbarToggle", "block");
    nid.style.setProperty("--brandShowMobileViewDisplay", "none");
    nid.style.setProperty("--navbarCloseButtonDisplay", "inline");

    setAdministratorNavbarExpanded(true);
    setAdministratorNavbarExpandedCurrentWidth(window.innerWidth);
  }

  function handleClickNavbarCloseButton() {
    // navbarItemsDiv
    var nid = document.querySelector(":root");

    nid.style.setProperty("--navbarCloseButtonDisplay", "none");
    nid.style.setProperty("--brandShowMobileViewDisplay", "block");
    nid.style.setProperty("--navbarToggle", "none");
  }

  // =========================
  // Experimental code, on why I put
  // this addEventListener on useEffect function
  // Note: useEffect is capable of realtime data
  // ===========================================
  React.useEffect(function () {
    // window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1101) {
        // navbarItemsDiv
        var nid = document.querySelector(":root");
        nid.style.setProperty("--brandShowMobileViewDisplay", "none");
      } else if (window.innerWidth <= 1100) {
        // navbarItemsDiv
        var nid = document.querySelector(":root");
        nid.style.setProperty("--brandShowMobileViewDisplay", "block");
      }

      if (administratorNavbarExpanded == true) {
        if (window.innerWidth !== administratorNavbarExpandedCurrentWidth) {
          // navbarItemsDiv
          var nid = document.querySelector(":root");
          nid.style.setProperty("--navbarCloseButtonDisplay", "none");
          nid.style.setProperty("--brandShowMobileViewDisplay", "block");
          nid.style.setProperty("--navbarToggle", "none");

          setAdministratorNavbarExpanded(false);
          setAdministratorNavbarExpandedCurrentWidth(undefined);
        }
      }
    });
  });

  console.log("Component render: " + Math.random());

  return (
    <div className="administratorNavbarDiv">
      {/* hamburger icon and brandname */}
      <p
        className="brandShowMobileView"
        onClick={handleClickBrandShowMobileView}
      >
        <i
          style={{ color: "gray", marginRight: "1rem" }}
          className="bi bi-border-width"
        ></i>
        BENMART
      </p>

      {/* Navbar close button */}
      <p className="navbarCloseButton" onClick={handleClickNavbarCloseButton}>
        close
      </p>

      <div className="navbarItemsDiv">
        <p className="brand" onClick={props.ponClick}>
          BENMART
        </p>
        <p className="navbarItems" onClick={props.ponClick}>
          cod
        </p>
        <p className="navbarItems" onClick={props.ponClick}>
          in-transit
        </p>
        <p className="navbarItems" onClick={props.ponClick}>
          order
        </p>
        <p className="navbarItems" onClick={props.ponClick}>
          account
        </p>
      </div>
      <div className="searchBox">
        <form onSubmit={props.phandleSubmit}>
          <Input
            value={props.pvalue}
            onChange={props.ponChange}
            required
            startEnhancer={<Search color="gray" size="2rem" />}
            placeholder="search here"
          />
        </form>
      </div>
    </div>
  );
}
