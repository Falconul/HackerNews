import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <div className="Navbar">
        <div className="nav-left">
          <NavLink to="/">
            <img
              src="./src/img/mail-1727485_1280.png"
              className="h-8 me-3"
              alt="HackerNews FrontPage"
            />
          </NavLink>
          <NavLink to="/new" className="nav-link">
            new{" "}
          </NavLink>
          |
          <NavLink to="/past" className="nav-link">
            past{" "}
          </NavLink>
          |
          <NavLink to="/comments" className="nav-link">
            comments{" "}
          </NavLink>
          |
          <NavLink to="/ask" className="nav-link">
            ask{" "}
          </NavLink>
          |
          <NavLink to="/show" className="nav-link">
            show{" "}
          </NavLink>
          |
          <NavLink to="/login" className="nav-link">
            submit{" "}
          </NavLink>
        </div>
        <div className="nav-right">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
