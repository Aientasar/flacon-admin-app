import "./App.css";
import {
  BrowserRouter as Redirect,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from "react";
import logo from "./images/logo.png";
import ListDevice from "./components/views/list";
import AddEditDevice from "./components/views/addEdit";
import { initState } from "./services/config";
import Login from "./components/views/login";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <React.Fragment>
      {useLocation().pathname != "/login" && (
        <header className="d-flex  shadow-sm align-items-center justify-content-center py-3 fixed-top  bg-white">
          <img style={{ width: 70 }} src={logo} alt="Logo" />
          <h4 className="font2 ms-1 mb-0 mt-2">Falcon Admin</h4>
        </header>
      )}
      <div className="row mt-5 w-100">
        {useLocation().pathname != "/login" && (
          <div
            className="col-12 fixed-left mt-3 pt-4 vh-100 col-md-auto bg-dark"
            style={{ minWidth: 250 }}
          >
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white ">
              <ul className="nav nav-pills flex-column mb-auto sidenav">
                <li className="nav-item">
                  <NavLink to="/devices" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/device.png")} />
                      <label>Devices</label>
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/packages" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/package.png")} />
                      <label>Packages</label>
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/owners" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/owner.png")} />
                      <label>Owners</label>
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/vehicles" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/vehcile.png")} />
                      <label>Vehciles</label>
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/drivers" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/driver.png")} />
                      <label>Drivers</label>
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tickets" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/ticket.png")} />
                      <label>Tickets</label>
                    </span>
                  </NavLink>
                </li>

                <li style={{ opacity: 0.2, pointerEvents: "none" }}>
                  <NavLink to="/payments" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/payment.png")} />
                      <label>Payments</label>
                    </span>
                  </NavLink>
                </li>
                <li style={{ opacity: 0.2, pointerEvents: "none" }}>
                  <NavLink to="/dues" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/due.png")} />
                      <label>Dues</label>
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="text-light nav-link">
                    <span className="d-flex align-items-center">
                      <img src={require("./images/logout.png")} />
                      <label>Logout</label>
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="col mt-5 m-3">
          <Routes>
            <Route exact path="/login" element={<Login />} />

            <Route
              exact
              path="/devices"
              element={
                <ProtectedRoute>
                  <ListDevice initState={initState.devices} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/devices/add"
              element={
                <ProtectedRoute>
                  <AddEditDevice initState={initState.devices} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/devices/add/:id"
              element={
                <ProtectedRoute>
                  <AddEditDevice initState={initState.devices} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/packages"
              element={
                <ProtectedRoute>
                  <ListDevice initState={initState.packages} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/packages/add"
              element={
                <ProtectedRoute>
                  <AddEditDevice initState={initState.packages} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/owners"
              element={
                <ProtectedRoute>
                  <ListDevice initState={initState.owners} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/owners/add"
              element={
                <ProtectedRoute>
                  <AddEditDevice initState={initState.owners} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/vehicles"
              element={
                <ProtectedRoute>
                  <ListDevice initState={initState.vehicles} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/vehicles/add"
              element={
                <ProtectedRoute>
                  <AddEditDevice initState={initState.vehicles} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/drivers"
              element={
                <ProtectedRoute>
                  <ListDevice initState={initState.drivers} />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/drivers/add"
              element={
                <ProtectedRoute>
                  <AddEditDevice initState={initState.vehicles} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/tickets"
              element={
                <ProtectedRoute>
                  <ListDevice initState={initState.tickets} />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/tickets/add"
              element={
                <ProtectedRoute>
                  <AddEditDevice initState={initState.tickets} />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
