import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const AddDifficultyLevel = () => {
  const difficultyLevelInputName = useRef();
  const difficultyLevelInputPoints = useRef();

  const history = useHistory();

  const addDifficultylevelHandler = (event) => {
    event.preventDefault();
    const difficultyLevelName = difficultyLevelInputName.current.value;
    const difficultyLevelPoints = difficultyLevelInputPoints.current.value;

    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/api/v1//admin/difficulty",
        {
          name: difficultyLevelName,
          points: difficultyLevelPoints,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.success == true) {
          alert(response.data.data.message);
          history.push("difficultyLevel");
        } else {
          alert("some thing went wrong");
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

                <form onSubmit={addDifficultylevelHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={difficultyLevelInputName}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Points</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter points"
                        ref={difficultyLevelInputPoints}
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

export default AddDifficultyLevel;
