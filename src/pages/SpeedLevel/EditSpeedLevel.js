import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

const EditSpeedLevel = () => {
  const speedNameRef = useRef();
  const speedConditionRef = useRef();
  const speedPointsRef = useRef();

  const location = useLocation();
  const history = useHistory();
  const [editSpeed, setEditSpeed] = useState();

  useEffect(() => {
    getSpeedLvlData();
  }, []);

  const getSpeedLvlData = async () => {
    const token = localStorage.getItem("token");

    const speedLvlId = location.state.speed_id;
    console.log(speedLvlId);
    const result = await axios.get(
      `http://localhost:8000/api/v1//admin/speed/${speedLvlId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // console.log(result.data.data.speedLevel);
    setEditSpeed(result.data.data.speedLevel);
  };

  const editSpeedLevelHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const speedLvlId = location.state.speed_id;

    const speedName = speedNameRef.current.value;
    const speedCondition = speedConditionRef.current.value;
    const speedPoints = speedPointsRef.current.value;

    await axios(`http://localhost:8000/api/v1//admin/speed/${speedLvlId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        name: speedName,
        points: speedPoints,
        condition: speedCondition,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("updated successfully");
          history.push("speedLevel");
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
    setEditSpeed((preValue) => {
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

                <form onSubmit={editSpeedLevelHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        value={editSpeed && editSpeed.name}
                        name="name"
                        ref={speedNameRef}
                        onChange={ChangeHanlder}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Condition</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter points"
                        value={editSpeed && editSpeed.condition}
                        name="condition"
                        ref={speedConditionRef}
                        onChange={ChangeHanlder}
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
                        value={editSpeed && editSpeed.points}
                        name="points"
                        ref={speedPointsRef}
                        onChange={ChangeHanlder}
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

export default EditSpeedLevel;
