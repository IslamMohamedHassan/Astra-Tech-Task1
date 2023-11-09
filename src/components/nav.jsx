import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {

  // State to Toggle menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container fw-bold">
        <NavLink className="navbar-brand" to="/">
          Astra Tech
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarSupportedContent"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/home"
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;