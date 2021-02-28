import React from "react";
import { Link, useLocation } from "react-router-dom";

export interface INavbarProps {
  className?: string;
}

export const Navbar = ({ className = "" }: INavbarProps) => {
  const { pathname } = useLocation();

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light sticky-top ${className}`}>
      <div className={"container"}>
        <Link className="navbar-brand" to="/">
          Shippy-Fly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ${pathname}` === "/search" ? "active" : ""}>
              <Link className={"nav-link"} to={"/search"}>
                Ricerca
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
