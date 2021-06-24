import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginApi from "./API/LoginApi";
import axios from "axios";
import { mongoServer } from "./Components/Constants";
import "react-toastify/dist/ReactToastify.css";

function NavBar(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);
  
  // reset email or password fields
  const handleReset = (evt) => {
    if (evt.target.name === "email-reset") setEmail("");
    else if (evt.target.name === "password-reset") setPassword("");
  };
  const handleInput = (evt) => {
    if (evt.target.name === "email") setEmail(evt.target.value);
    else if (evt.target.name === "password") setPassword(evt.target.value);
    else if (evt.target.name === "name") setName(evt.target.value);
  };
  // validation of input data while logging in
  const validateLogin = () => {
    axios
      .post(mongoServer + "/api/user/login", {
        email: email,
        password: password,
      })
      .then(function(response) {
        LoginApi.setLoginToken(response.data.token);
        toast.success("Success!");
        props.handleLoginClose();
        setEmail("");
        setPassword("");
        console.log("admin" + response.data.admin);
        if (response.data.admin === true) {
          LoginApi.setIsAdmin(response.data.admin);
          window.location = "/";
        }
      })
      .catch(function(error) {
        if (error.response) {
          toast.error(error.response.data);
        } else if (error.request) {
          toast.error("Something went wrong");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error(error.message);
        }
      });
  };
  
  // calling register api and send input data to it
  const register = () => {
    axios
      .post(mongoServer + "/api/user/register", {
        name: name,
        email: email,
        password: password,
        admin: admin,
      })
      .then(function(response) {
        props.handleRegisterClose();
        toast.success("Success!");
        setEmail("");
        setPassword("");
        setName("");
        setAdmin(false);
      })
      .catch(function(error) {
        if (error.response) {
          toast.error(error.response.data);
        } else if (error.request) {
          toast.error("Something went wrong");
        } else {
          toast.error(error.message);
        }
      });
  };
  // check if the user is logged in or not
  const checkLogin = () => {
    return LoginApi.getLoginToken();
  };
  // check if user is admin or not
  const checkAdmin = () => {
    return LoginApi.getIsAdmin();
  };
  // to log out from the session
  const Logout = () => {
    LoginApi.logout();
    window.location.reload();
  };

  return (
    <>
      <div className="sticky-nav">
        <ul className="header">
          {checkLogin() ? (
            <li onClick={Logout}>
              <Link to="/">Logout</Link>
            </li>
          ) : (
            <li onClick={props.handleLoginShow}>
              <Link to="/">Login</Link>
            </li>
          )}
          {checkAdmin() ? (
            <li>
              <Link to="/admindashboard">Admin Dashboard</Link>
            </li>
          ) : (
            <span />
          )}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li id="one">
            <b><Link to="/">PSL ConClave</Link></b>
          </li>
        </ul>
      </div>
      <Modal
        show={props.loginShow}
        onHide={props.handleLoginClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleInput}
            />
            <InputGroup.Append>
              <Button
                variant="secondary"
                name="email-reset"
                onClick={handleReset}
              >
                &times;
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Password"
              value={password}
              name="password"
              type="password"
              onChange={handleInput}
            />
            <InputGroup.Append>
              <Button
                variant="secondary"
                name="password-reset"
                onClick={handleReset}
              >
                &times;
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <div className="new-user">
            <span
              onClick={() => {
                props.handleLoginClose();
                props.handleRegisterShow();
              }}
              className="ie-10-ml-auto ml-auto mt-1 tm-font-semibold tm-color-primary "
            >
              New user?
            </span>
          </div>{" "}
          <Button variant="danger" onClick={props.handleLoginClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={validateLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={props.registerShow}
        onHide={props.handleRegisterClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleInput}
            />
            <InputGroup.Append>
              <Button
                variant="secondary"
                name="email-reset"
                onClick={handleReset}
              >
                &times;
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleInput}
            />
            <InputGroup.Append>
              <Button
                variant="secondary"
                name="password-reset"
                onClick={handleReset}
              >
                &times;
              </Button>
            </InputGroup.Append>
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Password"
              value={password}
              name="password"
              type="password"
              onChange={handleInput}
            />
            <InputGroup.Append>
              <Button
                variant="secondary"
                name="email-reset"
                onClick={handleReset}
              >
                &times;
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {/* /////////////// */}
          <InputGroup className="mb-3">
            <InputGroup.Text style={{ backgroundColor: "white" }}>
              Admin
              <input
                type="checkbox"
                style={{ marginLeft: "10px" }}
                value={admin}
                onChange={() => {
                  setAdmin(!admin);
                }}
                aria-label="Checkbox for following text input"
              />
            </InputGroup.Text>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <div className="new-user">
            <span
              onClick={() => {
                props.handleRegisterClose();
                props.handleLoginShow();
              }}
              className="ie-10-ml-auto ml-auto mt-1 tm-font-semibold tm-color-primary "
            >
              Already a user ?
            </span>
          </div>
          <Button variant="danger" onClick={props.handleLoginClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={register}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        pauseOnHover={false}
        newestOnTop
        pauseOnFocusLoss={false}
      />
    </>
  );
}

export default NavBar;
