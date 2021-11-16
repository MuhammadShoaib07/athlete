import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

const EditDifficulttyLevel = () => {
  const diffLvlNameRef = useRef();
  const diffLvlPointsRef = useRef();

  const location = useLocation();
  const history = useHistory();
  const [editDiffLvl, setEdttDiffLvl] = useState();

  useEffect(() => {
    getDiffLvlData();
  }, []);

  const getDiffLvlData = async () => {
    const token = localStorage.getItem("token");

    const diffLvlId = location.state.diff_id;
    const result = await axios.get(
      `http://localhost:8000/api/v1/admin/difficulty/${diffLvlId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setEdttDiffLvl(result.data.data.difficulty);
    console.log(result.data.data.difficulty);
  };

  const editDifflvlHandler = async (event) => {
    debugger;
    event.preventDefault();
    const token = localStorage.getItem("token");
    const diffLvlName = diffLvlNameRef.current.value;
    const diffLvlPoints = diffLvlPointsRef.current.value;

    const diffLvlId = location.state.diff_id;

    await axios(`http://localhost:8000/api/v1/admin/difficulty/${diffLvlId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        name: diffLvlName,
        points: diffLvlPoints,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("updated successfully");
          history.push("difficultyLevel");
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
    setEdttDiffLvl((preValue) => {
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

                <form onSubmit={editDifflvlHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        value={editDiffLvl && editDiffLvl.name}
                        ref={diffLvlNameRef}
                        name="name"
                        onChange={ChangeHanlder}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Points</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter points"
                        value={editDiffLvl && editDiffLvl.points}
                        ref={diffLvlPointsRef}
                        name="points"
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

export default EditDifficulttyLevel;
