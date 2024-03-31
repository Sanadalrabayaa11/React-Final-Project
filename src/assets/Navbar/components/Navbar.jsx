import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";
import "./Navbar.css";

function Navbar() {
  const { userName, setUserToken, setUserName, cartCount } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get dark mode preference from local storage or default to false
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save dark mode preference to local storage
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserName(null);
    navigate("/login");
  };

  useEffect(() => {
    // Add/remove dark mode class to body based on isDarkMode state
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <nav
      className={`navbar navbar-expand-lg position-sticky top-0 z-3  ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid  mb-3  p-3 bg-info bg-opacity-10 border border-info border rounded  ">
        <div className="d-flex">
          <i className="bi bi-tencent-qq logo ms-3 " />
          <span className="navbar-brand ms-3 me-5 fw-bold" to="/">
            SANAD E-COMMERCE
          </span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
            <li className="nav-item me-2 ">
              <NavLink
                className="nav-link btn btn-outline-info fw-bold "
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                className="nav-link btn btn-outline-info fw-bold "
                aria-current="page"
                to="/products"
              >
                Products
              </NavLink>
            </li>
            {userName ? (
              <>
                <li className="nav-item me-2">
                  <NavLink
                    className="nav-link btn btn-outline-info fw-bold position-relative"
                    aria-current="page"
                    to="/Cart"
                  >
                    Cart{" "}
                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                </li>

                <li className="nav-item me-2">
                  <NavLink
                    className="nav-link btn btn-outline-info fw-bold"
                    aria-current="page"
                    to="/Profile"
                  >
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item me-2" onClick={logout}>
                  <NavLink
                    className="nav-link btn btn-outline-info fw-bold"
                    aria-current="page"
                    to="/logout"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <NavLink
                    className="nav-link btn btn-outline-info fw-bold"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item me-2">
                  <NavLink
                    className="nav-link btn btn-outline-info fw-bold"
                    aria-current="page"
                    to="/register"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="me-3">
          <NavLink
            className="me-3"
            to=""
            onClick={() =>
              window.open("https://github.com/Sanadalrabayaa11", "_blank")
            }
          >
            <i className="bi bi-github logoGit" />
          </NavLink>
          <button
            className="dark-toggle mode buttonNav"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <i className="bi bi-sun-fill "></i> // Sun icon for light mode
            ) : (
              <i className="bi bi-moon-fill"></i> // Moon icon for dark mode
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
