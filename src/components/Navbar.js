import React, { useMemo, useState, useContext } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/FirestoreContext";

const LogIn = () => {
  const { logIn, currentUser } = useAuthContext();
  return (
    !currentUser && (
      <button type="button" className="btn btn-warning" onClick={logIn}>
        Login
      </button>
    )
  );
};

const LogOut = () => {
  const { logOut, currentUser } = useAuthContext();
  return (
    !!currentUser && (
      <button type="button" className="btn btn-danger" onClick={logOut}>
        Logout
      </button>
    )
  );
};

function Navigation() {
  const { currentUser } = useAuthContext();
  const { pathname } = useLocation();

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link
          className={`nav-link ${pathname === "/" ? "active" : ""} `}
          aria-current="page"
          to="/"
        >
          Home
        </Link>
      </li>
      {currentUser && (
        <li className="nav-item">
          <Link
            className={`nav-link ${
              pathname === "/stockimages" ? "active" : ""
            } `}
            aria-current="page"
            to="/stockimages"
          >
            My Stock Images
          </Link>
        </li>
      )}
      {currentUser && (
        <li className="nav-item">
          <Link
            className={`nav-link ${pathname === "/profile" ? "active" : ""}`}
            aria-current="page"
            to="/profile"
          >
            Profile
          </Link>
        </li>
      )}
    </ul>
  );
}

function SearchForm() {
  const { filterItems } = useContext(Context);
  const [searchText, setSearchText] = useState(null);

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
    filterItems(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    filterItems(searchText);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleOnSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleOnChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

function Dropdown() {
  const { currentUser } = useAuthContext();

  const username = useMemo(() => {
    return currentUser?.displayName;
  }, [currentUser]);

  const avatar = useMemo(() => {
    return !!currentUser ? (
      <img
        className="avatar"
        src={currentUser?.photoURL}
        alt={currentUser?.displayName}
        width="34px"
        height="34px"
      />
    ) : (
      "Login"
    );
  }, [currentUser]);
  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#a"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {avatar}
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          {currentUser && (
            <>
              <li className="text-center p-2">
                <Link to="/profile">{username}</Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
            </>
          )}

          <li className="d-flex justify-content-center">
            <LogIn />
            <LogOut />
          </li>
        </ul>
      </li>
    </ul>
  );
}
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#a">
          ⚡ Firestock
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Navigation />
          <SearchForm />
          <Dropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
