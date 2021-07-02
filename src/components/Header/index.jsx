import React from "react";
import Context from "../context";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    const { isAuthenticated, user } = this.context;

    return (
      <header className="header text-center">
        <h1 className="blog-name pt-lg-4 mb-0">
          <Link to="/profile">
            {isAuthenticated ? user.name : <Link to="/login">Login</Link>}
          </Link>
        </h1>

        <nav className="navbar navbar-expand-lg navbar-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            aria-controls="navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navigation" className="collapse navbar-collapse flex-column">
            <div className="profile-section pt-3 pt-lg-0">
              <img
                className="profile-image mb-3 rounded-circle mx-auto"
                src="uploads/profile.png"
                alt="fsdfs"
              />

              <div className="bio mb-3">
                Hi, my name is Anthony Doe. Briefly introduce yourself here. You
                can also provide a link to the about page.
                <br />
                <a href="about.html">Find out more about me</a>
              </div>

              <hr />
            </div>

            <ul className="navbar-nav flex-column text-left">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  <i className="fas fa-home fa-fw mr-2"></i>Blog Home{" "}
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              {isAuthenticated !== true ? (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <i className="fas fa-bookmark fa-fw mr-2"></i>Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <i className="fas fa-user fa-fw mr-2"></i>Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link onClick={this.context.logOut} className="nav-link">
                      <i className="fas fa-bookmark fa-fw mr-2"></i>Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/users" className="nav-link">
                      <i className="fas fa-user fa-fw mr-2"></i>Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="fas fa-user fa-fw mr-2"></i>Dashboard
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <i className="fas fa-user fa-fw mr-2"></i>About Us
                </Link>
              </li>
            </ul>

            <div className="my-2 my-md-3">
              <a
                className="btn btn-primary"
                href="https://themes.3rdwavemedia.com/"
                target="_blank"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
Header.contextType = Context;
export default Header;
