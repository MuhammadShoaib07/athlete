import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const SpeedLevel = () => {
  const history = useHistory();
  const [speedLevel, setSpeedLevel] = useState([]);

  useEffect(() => {
    getAllSpeedLevel();
  }, []);

  const getAllSpeedLevel = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      "http://localhost:8000/api/v1//admin/speed",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(result.data.data.speedLevel);
    setSpeedLevel(result.data.data.speedLevel);
  };

  const editSpeedLevelHanlder = (id) => {
    history.push("editSpeed", { speed_id: id });
  };
  const deleteSpeedlevelhandler = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/v1//admin/speed/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // alert("deleted Successfully");
        getAllSpeedLevel();
      });
  };

  let speedLevels = null;

  if (speedLevel.length > 0) {
    speedLevels = speedLevel.map((speedlvl, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{speedlvl.name}</td>
          <td> {speedlvl.condition}</td>
          <td> {speedlvl.points}</td>
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
                  editSpeedLevelHanlder(speedlvl._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteSpeedlevelhandler(speedlvl._id);
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

  const addSpeedLevelHandler = () => {
    history.push("/addSpeedLevel");
  };
  return (
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Speed Levels</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Speed Levels</li>
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
                    <h3 class="card-title">Speed levels</h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addSpeedLevelHandler}
                    >
                      Add Speed Level
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table id="example2" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Watch[time]</th>
                        <th>Points</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{speedLevels}</tbody>
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

export default SpeedLevel;
