import React from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Adduser = () => {
  const [message, setMessage] = useState();
  const history = useHistory();

  const userNmaeRref = useRef();
  const firstNmaeRref = useRef();
  const lastNmaeRref = useRef();
  const EmailRref = useRef();
  const passwordRref = useRef();
  const confirmPassRref = useRef();
  const roleRref = useRef();
  const userImgRef = useRef();

  const signinHanlder = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    const enteredUserName = userNmaeRref.current.value;
    const enteredFirstName = firstNmaeRref.current.value;
    const enteredlastName = lastNmaeRref.current.value;
    const enteredEmail = EmailRref.current.value;
    const enteredPasswor = passwordRref.current.value;
    const enteredConfirmPassword = confirmPassRref.current.value;
    const enteredRole = roleRref.current.value;
    const selectedImg = userImgRef.current.files[0];

    console.log(selectedImg);
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
      userData.append("lastname", enteredlastName);
      userData.append("email", enteredEmail);
      userData.append("password", enteredPasswor);
      userData.append("confirm_password", enteredConfirmPassword);
      userData.append("roles", enteredRole);
      userData.append("image", selectedImg);
      await axios("http://localhost:8000/api/v1/signup", {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        data: userData,
      }).then((res) => {
        if (res.data.success) {
          if (res.data.data.token !== undefined) {
            setMessage("User Successfully Created");
            history.push("user");
          }
        } else if (res.data.success === false) {
          setMessage("Some Thing Went Wrong");
        }
      });
    }
  };
  return (
    <div className="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Users</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">users</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 ">
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
                        placeholder="Enter Name"
                        ref={userNmaeRref}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Email"
                        ref={EmailRref}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="First Name"
                        ref={firstNmaeRref}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Last Name"
                        ref={lastNmaeRref}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Password"
                        ref={passwordRref}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="password"
                        ref={confirmPassRref}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleSelectBorder">Role</label>
                      <select
                        class="custom-select form-control-border"
                        id="exampleSelectBorder"
                        ref={roleRref}
                        required
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>
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
    </div>
  );
};

export default Adduser;
