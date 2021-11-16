import React, { useRef, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const AddDrill = () => {
  const drillNameRef = useRef();
  const athleteNameRef = useRef();
  const categoryNameRef = useRef();
  const difficultyNameRef = useRef();
  const thumbnailRef = useRef();

  const history = useHistory();

  const [athlete, setAthlete] = useState([]);
  const [category, setCategory] = useState([]);
  const [difficulty, setDifficulty] = useState([]);

  useEffect(() => {
    getAlldropDownData();
  }, []);

  const getAlldropDownData = async () => {
    const token = localStorage.getItem("token");
    const athlete = await axios.get(
      "http://localhost:8000/api/v1//admin/athlete",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const category = await axios.get(
      "http://localhost:8000/api/v1//admin/categories",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const difficulty = await axios.get(
      "http://localhost:8000/api/v1//admin/difficulty",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setAthlete(athlete.data.data.athlete);
    setCategory(category.data.data.category);
    setDifficulty(difficulty.data.data.difficulty);
  };

  const addDrillhanlder = async (event) => {
    debugger;
    event.preventDefault();
    const token = localStorage.getItem("token");

    const drillName = drillNameRef.current.value;
    const athleteName = athleteNameRef.current.value;
    const categoryName = categoryNameRef.current.value;
    const diffLvlLvl = difficultyNameRef.current.value;
    const thumbnail = thumbnailRef.current.files[0];

    const thumnnailData = new FormData();
    thumnnailData.append("thumbnail", thumbnail);
    axios
      .post(
        "http://localhost:8000/api/v1//admin/drills/upload",
        thumnnailData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const thumbnailImg = response.data.data.videos.thumbnail;

        const drillData = new FormData();
        drillData.append("name", drillName);
        drillData.append("athlete", athleteName);
        drillData.append("category", categoryName);
        drillData.append("difficultyLevel", diffLvlLvl);
        drillData.append("isPremium", true);
        drillData.append("thumbnail", thumbnailImg);

        axios("http://localhost:8000/api/v1//admin/drills", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: drillData,
        })
          .then((response) => {
            console.log(response);
            if (response.data.success === true) {
              alert("item added successfully");
              history.push("drills");
            } else {
              alert("some thing went wrong");
            }
          })
          .catch((error) => {
            alert(error);
          });
      });
  };

  return (
    <div className="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Drills</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Drills</li>
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
                  <h3 class="card-title">Add Drill</h3>
                </div>

                <form onSubmit={addDrillhanlder}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={drillNameRef}
                        required
                        name="name"
                      />
                    </div>

                    <div className="form-group">
                      <label for="exampleInputEmail1">Athlete</label>
                      <select className="form-control" name="athlete">
                        <option selected disabled value="">
                          Select Athlete
                        </option>
                        {athlete && athlete.length > 0
                          ? athlete.map((athlete, index) => {
                              return (
                                <option
                                  value={athlete._id}
                                  key={`athlete-${index}`}
                                  required
                                  ref={athleteNameRef}
                                >
                                  {athlete.name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="exampleInputEmail1">Category</label>
                      <select className="form-control" name="category">
                        <option selected disabled value="">
                          Select category
                        </option>
                        {category && category.length > 0
                          ? category.map((category, index) => {
                              return (
                                <option
                                  value={category._id}
                                  key={`category-${index}`}
                                  required
                                  ref={categoryNameRef}
                                >
                                  {category.name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="exampleInputEmail1">Difficulty Level</label>
                      <select className="form-control" name="difficultyLevel">
                        <option selected disabled value="">
                          Select difficulty
                        </option>
                        {difficulty && difficulty.length > 0
                          ? difficulty.map((difficulty, index) => {
                              return (
                                <option
                                  value={difficulty._id}
                                  key={`difficulty-${index}`}
                                  required
                                  ref={difficultyNameRef}
                                >
                                  {difficulty.name}
                                </option>
                              );
                            })
                          : ""}
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
                            required
                            ref={thumbnailRef}
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

export default AddDrill;
