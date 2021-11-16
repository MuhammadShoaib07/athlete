import React, { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

const EditUser = () => {
  const userNmaeRref = useRef();
  const firstNmaeRref = useRef();
  const lastNmaeRref = useRef();
  const EmailRref = useRef();
  const passwordRref = useRef();
  const confirmPassRref = useRef();
  const roleRref = useRef();
  const userImgRef = useRef();

  const location = useLocation();
  const history = useHistory();

  const [editUser, SetEdituser] = useState();

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const token = localStorage.getItem("token");

    const userId = location.state.user_id;
    const result = await axios.get(
      `http://localhost:8000/api/v1//admin/users/${userId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(result.data.data.user);
    SetEdituser(result.data.data.user);
  };

  const editUserHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const enteredUserName = userNmaeRref.current.value;
    const enteredFirstName = firstNmaeRref.current.value;
    const enteredlastName = lastNmaeRref.current.value;
    const enteredEmail = EmailRref.current.value;
    // const enteredPasswor = passwordRref.current.value;
    // const enteredConfirmPassword = confirmPassRref.current.value;
    const enteredRole = roleRref.current.value;
    const selectedImg = userImgRef.current.files[0];

    const athleteId = location.state.athlete_id;

    const userData = new FormData();
    userData.append("userName", enteredUserName);
    userData.append("firstName", enteredFirstName);
    userData.append("lastName", enteredlastName);
    userData.append("email", enteredEmail);
    // userData.append("password", enteredPasswor);
    // userData.append("confirm_password", enteredConfirmPassword);
    userData.append("roles", enteredRole);
    userData.append("image", selectedImg);

    await axios(`http://localhost:8000/api/v1//admin/users/${athleteId}`, {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        Authorization: token,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("updated successfully");
          history.push("user");
        } else {
          alert("some thing went wrong");
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  const ChangeHanlder = (event) => {
    const { name, value } = event.target;
    SetEdituser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
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

                <form onSubmit={editUserHandler}>
                  <div className="card-body">
                    <div className="form-group">
                      <label for="exampleInputEmail1">User Nmae</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={userNmaeRref}
                        value={editUser && editUser.userName}
                        required
                        onChange={ChangeHanlder}
                        name="userName"
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
                        value={editUser && editUser.email}
                        required
                        onChange={ChangeHanlder}
                        name="email"
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
                        value={editUser && editUser.firstName}
                        required
                        onChange={ChangeHanlder}
                        name="firstname"
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
                        value={editUser && editUser.lastName}
                        required
                        onChange={ChangeHanlder}
                        name="lastName"
                      />
                    </div>
                    {/* <div className="form-group">
                      <label for="exampleInputEmail1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Password"
                        ref={passwordRref}
                        value={editUser && editUser.password}
                        required
                      />
                    </div> */}
                    {/* <div className="form-group">
                      <label for="exampleInputEmail1">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="password"
                        ref={confirmPassRref}
                        value={editUser && editUser.confirm_password}
                        required
                      />
                    </div> */}
                    <div class="form-group">
                      <label for="exampleSelectBorder">Role</label>
                      <select
                        class="custom-select form-control-border"
                        id="exampleSelectBorder"
                        ref={roleRref}
                        value={editUser && editUser.roles}
                        required
                        onChange={ChangeHanlder}
                        name="roles"
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

export default EditUser;
