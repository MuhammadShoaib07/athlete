import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import avatar from "../../assets/img/default-avatar.png";
const User = () => {
  const history = useHistory();
  const [user, setUser] = useState([]);

  useEffect(() => {
    getAllusers();
  }, []);

  const getAllusers = async () => {
    const token = localStorage.getItem("token");

    const result = await axios.get(
      "http://localhost:8000/api/v1//admin/users",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(result.data.data.user);
    setUser(result.data.data.user);
  };

  const editUserHanlder = (id) => {
    history.push("editUser", { user_id: id });
  };
  const delteUserHnadler = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/v1//admin/users/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // alert("deleted Successfully");
        getAllusers();
      });
  };

  let users = null;
  if (user.length > 0) {
    users = user.map((user, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>
            {user.image === undefined ? (
              <img
                src={avatar}
                style={{ height: "60px", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={`http://localhost:8000/image/${user.image}`}
                style={{ height: "60px", borderRadius: "50%" }}
              />
            )}
          </td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td> {user.email}</td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  editUserHanlder(user._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  delteUserHnadler(user._id);
                }}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  const adduserHnadler = () => {
    history.push("addUser");
  };
  return (
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">User</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">user</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div class="card">
                <div class="card-header">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 class="card-title">users</h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={adduserHnadler}
                    >
                      Add User
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table id="example2" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <td>Image</td>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{users}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default User;
