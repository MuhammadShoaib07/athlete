import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { userActions } from "../../store/user/user-slice";
import { useDispatch } from "react-redux";

const Adduser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userNameRef = useRef();
  const EmailRef = useRef();
  const firstNmaeRef = useRef();
  const lastNmaeRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const roleRef = useRef();
  const userImgRef = useRef();

  const signinHanlder = async (event) => {
    event.preventDefault();
    const enteredUserName = userNameRef.current.value;
    const enteredEmail = EmailRef.current.value;
    const enteredFirstName = firstNmaeRef.current.value;
    const enteredlastName = lastNmaeRef.current.value;
    const enteredPasswor = passwordRef.current.value;
    const enteredConfirmPassword = confirmPassRef.current.value;
    const enteredRole = roleRef.current.value;
    const selectedImg = userImgRef.current.files[0];

    const newUserRData = {
      userName: enteredUserName,
      firstName: enteredFirstName,
      lastName: enteredlastName,
      email: enteredEmail,
      password: enteredPasswor,
      confirm_password: enteredConfirmPassword,
      roles: enteredRole,
      image: selectedImg,
    };
    const userD = new FormData();
    userD.append("userName", enteredUserName);
    userD.append("firstName", enteredFirstName);
    userD.append("lastName", enteredlastName);
    userD.append("email", enteredEmail);
    userD.append("password", enteredPasswor);
    userD.append("confirm_password", enteredConfirmPassword);
    userD.append("roles", enteredRole);
    userD.append("image", selectedImg);
    await axios("http://localhost:8000/api/v1/signup", {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: userD,
    }).then((res) => {
      if (res.data.success === true) {
        if (res.data.data.token !== undefined) {
          dispatch(userActions.addUser(res.data.data.user));
          alert("User Successfully Created");
          history.push("user");
        }
      } else if (res.data.success === false) {
        alert("Some Thing Went Wrong");
      }
    });
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
                    <div className="form-group">
                      <label for="exampleInputEmail1">User Nmae</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={userNameRef}
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
                        ref={EmailRef}
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
                        ref={firstNmaeRef}
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
                        ref={lastNmaeRef}
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
                        ref={passwordRef}
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
                        ref={confirmPassRef}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleSelectBorder">Role</label>
                      <select
                        class="custom-select form-control-border"
                        id="exampleSelectBorder"
                        ref={roleRef}
                        required
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
                            // required
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
    </div>
  );
};

export default Adduser;
