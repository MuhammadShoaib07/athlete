import React, { useState, useEffect, useRef, useReducer } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

const EditDrill = () => {
  const drillNameRef = useRef();
  const athleteNameRef = useRef();
  const categoryNameRef = useRef();
  const difficultyNameRef = useRef();
  const thumbnailRef = useRef();

  const location = useLocation();
  const history = useHistory();

  const [editDrill, setEditDrill] = useState();
  const [editAthlete, setEditAthlete] = useState();
  const [editcategory, setEditCategeory] = useState();
  const [editDiffLvl, setEditDifLvl] = useState();

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const token = localStorage.getItem("token");
    debugger;
    const drill_id = location.state.drill_id;
    await axios
      .get(`http://localhost:8000/api/v1//admin/drills/${drill_id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setEditDrill(response.data.data.drills[0]);
        console.log(response.data.data.drills[0]);
      });
    await axios
      .get("http://localhost:8000/api/v1//admin/athlete", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setEditAthlete(response.data.data.athlete);
        console.log(response.data.data.athlete);
      });
    await axios
      .get("http://localhost:8000/api/v1//admin/categories", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setEditCategeory(response.data.data.category);
      });
    await axios
      .get("http://localhost:8000/api/v1//admin/difficulty", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setEditDifLvl(response.data.data.difficulty);
      });
  };

  const editDrillhanlder = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const drillName = drillNameRef.current.value;
    const athleteName = athleteNameRef.current.value;
    const categoryName = categoryNameRef.current.value;
    const diffLvl = difficultyNameRef.current.value;
    const thumbnail = thumbnailRef.current.value;

    if (thumbnail !== undefined) {
      const thumbnailData = new FormData();
      thumbnailData.append("thumbnail", thumbnail);

      axios
        .post(
          "http://localhost:8000/api/v1//admin/drills/upload",
          thumbnailData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          const thumbnailImg = response.data.data.videos.thumbnail;
          const drill_id = location.state.drill_id;
          const drillData = new FormData();
          drillData.append("name", drillName);
          drillData.append("athlete", athleteName);
          drillData.append("category", categoryName);
          drillData.append("difficultyLevel", diffLvl);
          drillData.append("isPremium", true);
          drillData.append("thumbnail", thumbnailImg);

          axios(`http://localhost:8000/api/v1//admin/drills/${drill_id}`, {
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
                alert("item update successfully");
                history.push("drills");
              } else {
                alert("some thing went wrong");
              }
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const ChangeHanlder = (event) => {
    const { name, value } = event.target;
    setEditDrill((preValue) => {
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

                <form onSubmit={editDrillhanlder}>
                  {/* {console.log(editDrill[0].name)} */}
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        name="name"
                        ref={drillNameRef}
                        required
                        value={editDrill && editDrill.name}
                        name="name"
                        onChange={ChangeHanlder}
                      />
                    </div>

                    <div className="form-group">
                      <label for="exampleInputEmail1">Athlete</label>
                      <select className="form-control" name="athlete">
                        <option selected disabled value="">
                          Select Athlete
                        </option>
                        {editAthlete && editAthlete.length > 0
                          ? editAthlete.map((athlete, index) => {
                              return (
                                <option
                                  value={athlete._id}
                                  key={`athlete-${index}`}
                                  required
                                  ref={athleteNameRef}
                                  selected={
                                    athlete._id === editDrill.athlete._id
                                  }
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
                        {editcategory && editcategory.length > 0
                          ? editcategory.map((category, index) => {
                              return (
                                <option
                                  value={category._id}
                                  key={`category-${index}`}
                                  required
                                  ref={categoryNameRef}
                                  selected={
                                    category._id === editDrill.category._id
                                  }
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
                        {editDiffLvl && editDiffLvl.length > 0
                          ? editDiffLvl.map((difficulty, index) => {
                              return (
                                <option
                                  value={difficulty._id}
                                  key={`difficulty-${index}`}
                                  required
                                  ref={difficultyNameRef}
                                  selected={
                                    difficulty._id ===
                                    editDrill.difficultyLevel._id
                                  }
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
                    <img
                      src={
                        editDrill &&
                        `http://localhost:8000/image/drills/${editDrill.thumbnail}`
                      }
                      style={{
                        height: "75px",
                        width: "70px",
                        borderRadius: "50%",
                      }}
                    />
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

export default EditDrill;
