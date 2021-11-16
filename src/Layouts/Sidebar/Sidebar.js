import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/AdminLTELogo.png";
import Profile from "../../assets/img/user2-160x160.jpg";
const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <NavLink to="dashboard" className="brand-link">
        <img
          src={Logo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: "0.8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </NavLink>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={Profile}
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>

        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="dashboard" className="nav-link">
                <i className="nav-icon far fa-image"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="user" className="nav-link">
                <i className="nav-icon fas fa-columns"></i>
                <p>User</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="categories" className="nav-link">
                <i className="nav-icon fas fa-columns"></i>
                <p>Categories</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="athlete" className="nav-link">
                <i className="nav-icon fas fa-columns"></i>
                <p>Athlete</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="difficultyLevel" className="nav-link">
                <i className="nav-icon fas fa-columns"></i>
                <p>Difficulty Level</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="speedLevel" className="nav-link">
                <i className="nav-icon fas fa-columns"></i>
                <p>Speed Level</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="drills" className="nav-link">
                <i className="nav-icon fas fa-columns"></i>
                <p>Drills</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="subscription" className="nav-link">
                <i className="nav-icon fas fa-columns"></i>
                <p>Subscription</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
