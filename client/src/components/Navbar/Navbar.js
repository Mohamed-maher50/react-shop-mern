import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import Logout from "../../pages/Logout";
import CardIcon from "../CardIcon/CardIcon";
function Navbar() {
  const { logedin, isAdmin } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light ">
        <div className="container mx-auto md:px-20">
          <Link to={"/"} className="navbar-brand">
            BlackShop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>

              {logedin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Products"}>
                      products
                    </Link>
                  </li>

                  {isAdmin ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/createProducts"}>
                          Create Products
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/deleteProducts"}>
                          Delete Products
                        </Link>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <></>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {!logedin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>

                  <Link className="nav-link" to={"/register"}>
                    register
                  </Link>
                </>
              ) : (
                <>
                  <Logout />
                  <CardIcon />
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
