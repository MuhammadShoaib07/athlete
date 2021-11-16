import React, { useState, useRef } from "react";
import { useHistory, Redirect } from "react-router";
import { authActions } from "../../store/auth/auth-slice";
import axios from "axios";
import "../../assets/css/login.css";

const Login = () => {
  const [message, setMessage] = useState();
  const history = useHistory();

  const emailRef = useRef();
  const PasswordRef = useRef();

  const Loginhanlder = (event) => {
    event.preventDefault(authActions);
    const enteredInputEmail = emailRef.current.value;
    const enteredInputpassword = PasswordRef.current.value;

    if (enteredInputEmail === "" || enteredInputpassword === "") {
      setMessage("Enter Email and password ");
    } else {
      axios
        .post("http://localhost:8000/api/v1/authenticate", {
          email: enteredInputEmail,
          password: enteredInputpassword,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            if (res.data.data.token != undefined) {
              localStorage.setItem("token", res.data.data.token);
              setMessage(res.data.message);
              <Redirect to="dashboard" />;
            } else {
              setMessage("Somw thing went wrong");
            }
          } else if (res.data.success === false) {
            setMessage(res.data.errors.email.message);
          }
        });
    }
  };
  return (
    <section className="content">
      <div className="container">
        <div className="row ">
          <div className="col-md-6 centered-loginForm">
            <div class="card card-primary ">
              <div class="card-header">
                <h3 class="card-title"> Login </h3>
              </div>

              <form onSubmit={Loginhanlder}>
                <div className="card-body">
                  {message && <p className="text-danger"> {message} </p>}
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      ref={emailRef}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      ref={PasswordRef}
                      required
                    />
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
