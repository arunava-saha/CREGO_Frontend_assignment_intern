import React from "react";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

export const Nav = () => {
  return (
    <div className="">
      <nav className="navbar navbar-light bg-light justify-content-between">
        <Link
          activeClass="active"
          to="add"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          EXPRESSION
        </Link>
        <Link
          activeClass="active"
          to="result"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          OUTPUT
        </Link>
      </nav>
    </div>
  );
};
