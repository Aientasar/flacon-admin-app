import "./App.css";
import { BrowserRouter as Redirect, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from "react";
import logo from "./images/logo.png";
import ListDevice from "./components/views/list";
import AddEditDevice from "./components/views/addEdit";

import { withRouter } from "react-router";
import { initState } from "./services/config";

function App() {
  // const MyContext = React.createContext(defaultValue);

  let styles = {
    minWidth: 250,
  };

  let logoStyle = {
    width: 70,
  };

  // App --> List Devcie/AddEdit edit --> generics

  return (
    <React.Fragment>
      <header className="d-flex  shadow-sm align-items-center justify-content-center py-3 fixed-top  bg-white">
        <img style={logoStyle} src={logo} alt="Logo" />
        <h4 className="font2 ms-1 mb-0 mt-2">Falcon Admin</h4>
      </header>
      <div className="row mt-5 w-100">
        <div
          className="col-12 fixed-left mt-3 pt-4 vh-100 col-md-auto bg-dark"
          style={styles}
        >
          <div className="d-flex flex-column flex-shrink-0 p-3 text-white ">
            <ul className="nav nav-pills flex-column mb-auto sidenav">
              <li className="nav-item">
                <NavLink
                  to="/devices"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/device.png")} />
                    <label>Devices</label>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/packages"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/package.png")} />
                    <label>Packages</label>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/owners"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/owner.png")} />
                    <label>Owners</label>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vehicles"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/vehcile.png")} />
                    <label>Vehciles</label>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/drivers"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/driver.png")} />
                    <label>Drivers</label>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/payments"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/payment.png")} />
                    <label>Payments</label>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dues"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/due.png")} />
                    <label>Dues</label>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tickets"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/ticket.png")} />
                    <label>Tickets</label>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  activeClassName="active"
                  className="text-light nav-link"
                >
                  <span className="d-flex align-items-center">
                    <img src={require("./images/logout.png")} />
                    <label>Logout</label>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col mt-5 m-3">
          <Route exact path="/">
            <Redirect to="/devices" />
          </Route>
          <Route exact path="/devices">
            <ListDevice initState={initState.devices} />
          </Route>
          <Route exact path="/devices/add">
            <AddEditDevice initState={initState.devices} />
          </Route>
          <Route exact path="/devices/add/:id">
            <AddEditDevice initState={initState.devices} />
          </Route>
          <Route exact path="/packages">
            <ListDevice initState={initState.packages} />
          </Route>
          <Route exact path="/packages/add">
            <AddEditDevice initState={initState.packages} />
          </Route>
          <Route exact path="/owners">
            <ListDevice initState={initState.owners} />
          </Route>
          <Route exact path="/owners/add">
            <AddEditDevice initState={initState.owners} />
          </Route>
          <Route exact path="/vehicles">
            <ListDevice initState={initState.vehicles} />
          </Route>
          <Route exact path="/vehicles/add">
            <AddEditDevice initState={initState.vehicles} />
          </Route>
          <Route exact path="/tickets">
            <ListDevice initState={initState.tickets} />
          </Route>
          <Route exact path="/tickets/add">
            <AddEditDevice initState={initState.tickets} />
          </Route>
          <Route path="*">
            <Redirect to="/devices" />
          </Route>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(App);
