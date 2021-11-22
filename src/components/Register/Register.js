import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import "../../assets/css/register.css";

const Register = () => {
  const [message, setMessage] = useState();

  const userNmaeRref = useRef();
  const firstNmaeRref = useRef();
  const lastNmaeRref = useRef();
  const EmailRref = useRef();
  const passwordRref = useRef();
  const confirmPassRref = useRef();
  const roleRref = useRef();
  const userImgRef = useRef();

  const signinHanlder = (event) => {
    event.preventDefault();
    const enteredUserName = userNmaeRref.current.value;
    const enteredFirstName = firstNmaeRref.current.value;
    const enteredlastName = lastNmaeRref.current.value;
    const enteredEmail = EmailRref.current.value;
    const enteredPasswor = passwordRref.current.value;
    const enteredConfirmPassword = confirmPassRref.current.value;
    const enteredRole = roleRref.current.value;
    const userImg = userImgRef.current.files[0];
    if (
      enteredUserName === "" &&
      enteredFirstName === "" &&
      enteredlastName === "" &&
      enteredEmail === "" &&
      enteredPasswor === "" &&
      enteredConfirmPassword === ""
    )
      setMessage("Enter All The Credientils");
    else {
      const userData = new FormData();
      userData.append("userName", enteredUserName);
      userData.append("firstName", enteredFirstName);
      userData.append("lastName", enteredlastName);
      userData.append("email", enteredEmail);
      userData.append("password", enteredPasswor);
      userData.append("confirm_password", enteredConfirmPassword);
      userData.append("roles", enteredRole);
      userData.append("image", userImg);
      axios("http://localhost:8000/api/v1/signup", {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: userData,
      }).then((res) => {
        if (res.data.success === true) {
          if (res.data.data.token !== undefined) {
            setMessage("User Successfully Created");
          }
        } else if (res.data.success === false) {
          setMessage("Some Thing Went Wrong");
        }
      });
    }
  };
  return (
    <section className="content">
      <div className="container">
        <div className="row">
          <div className="col-md-6 centered-registerForm ">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Rigister</h3>
              </div>

              <form onSubmit={signinHanlder}>
                <div className="card-body">
                  {message && <p className="text-danger"> {message} </p>}
                  <div className="form-group">
                    <label for="exampleInputEmail1">User Nmae</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      ref={userNmaeRref}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      ref={EmailRref}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      ref={firstNmaeRref}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      ref={lastNmaeRref}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      ref={passwordRref}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      ref={confirmPassRref}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleSelectBorder">Role</label>
                    <select
                      class="custom-select form-control-border"
                      id="exampleSelectBorder"
                      ref={roleRref}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label htmlFor="exampleInputFile">File input</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="exampleInputFile"
                          ref={userImgRef}
                          required
                        />
                        <label
                          class="custom-file-label"
                          htmlFor="exampleInputFile"
                        >
                          Choose file
                        </label>
                      </div>
                      <div class="input-group-append">
                        <span class="input-group-text">Upload</span>
                      </div>
                    </div>
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

export default Register;
