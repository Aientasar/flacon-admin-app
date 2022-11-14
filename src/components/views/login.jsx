import React, { useEffect, useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import swal from "sweetalert";

const Login = (props) => {
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const useOnceCall = (cb, condition = true) => {
    const isCalledRef = React.useRef(false);
    React.useEffect(() => {
      if (condition && !isCalledRef.current) {
        isCalledRef.current = true;
        cb();
      }
    }, [cb, condition]);
  };

  useOnceCall(() => {
    logout();
  });

  //currently regitsration is direct from backend
  // const register = async () => {
  //   console.log("register");
  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       regEmail,
  //       regPass
  //     );
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const login = async (event) => {
    event.preventDefault();
    if (!regEmail || !regPass) {
      swal("Enter Username and password!");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, regEmail, regPass);
      localStorage.setItem("uid", await auth.currentUser.getIdToken(true));
      navigate("/devices");
      setLoading(false);
    } catch (error) {
      swal(error.code.split("/")[1]);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
    } catch (error) {
      swal(error.message);
    }
  };

  return (
    <form
      onSubmit={login}
      className="card border-0 shadow mt-3"
      style={liStyle}
    >
      <img style={{ margin: "auto" }} src={logo} alt="Logo" />
      <h4 className="font2 p-3 m-auto mb-4">Falcon Admin</h4>

      <div className="mb-4">
        <label className="form-label text-dark">Email address</label>
        <input
          required
          type="email"
          className="form-control border-0 bg-light"
          onChange={(event) => {
            setRegEmail(event.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <label className="form-label text-dark">Password</label>
        <input
          type="password"
          required
          className="form-control border-0 bg-light"
          onChange={(event) => {
            setRegPass(event.target.value);
          }}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="btn fw-bold btn-dark m-3"
      >
        {loading && (
          <div
            className="spinner-border spinner-border-sm me-2"
            role="status"
          ></div>
        )}
        {!loading && <span>Login</span>}
      </button>
    </form>
  );
};

const liStyle = {
  padding: "2em",
  maxWidth: "27em",
  margin: "auto",
  borderRadius: "12px",
};

export default Login;
