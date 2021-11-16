import React, { useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const AddSpeedLevel = () => {
  const speedLevelInputname = useRef();
  const speedLevelInputCondition = useRef();
  const speedLevelInputpoints = useRef();

  const history = useHistory();

  const addSpeedLevelHandler = (event) => {
    event.preventDefault();
    const speedlvlName = speedLevelInputname.current.value;
    const speedLvlCondition = speedLevelInputCondition.current.value;
    const speedLvlPoints = speedLevelInputpoints.current.value;

    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/api/v1//admin/speed",
        {
          name: speedlvlName,
          points: speedLvlPoints,
          condition: speedLvlCondition,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.data.message);
          history.push("speedLevel");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Difficulty Level</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Difficulty Level</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Add Difficulty Level</h3>
                </div>

                <form onSubmit={addSpeedLevelHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={speedLevelInputname}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Condition</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter points"
                        ref={speedLevelInputCondition}
                      />
                    </div>
                    {<p>times watch will give</p>}
                    <div class="form-group">
                      <label for="exampleInputEmail1">Points</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter points"
                        ref={speedLevelInputpoints}
                      />
                    </div>
                  </div>

                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary">
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

export default AddSpeedLevel;
