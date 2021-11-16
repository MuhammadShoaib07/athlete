import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

const EditAthlete = () => {
  const athleteInputName = useRef();
  const athleteInputImg = useRef();

  const location = useLocation();
  const history = useHistory();
  const [editAthlete, setEditAthlete] = useState();

  useEffect(() => {
    getAthleteData();
  }, []);

  const getAthleteData = async () => {
    const token = localStorage.getItem("token");

    const athleteId = location.state.athlete_id;
    console.log(location);
    const result = await axios.get(
      `http://localhost:8000/api/v1//admin/athlete/${athleteId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(result.data.data.athlete);
    setEditAthlete(result.data.data.athlete);
  };

  const editAthleteHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const athleteName = athleteInputName.current.value;
    const athleteImg = athleteInputImg.current.files[0];

    const athleteId = location.state.athlete_id;
    if (athleteImg !== undefined) {
      const athleteData = new FormData();
      athleteData.append("name", athleteName);
      athleteData.append("image", athleteImg);
      await axios(`http://localhost:8000/api/v1//admin/athlete/${athleteId}`, {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        data: athleteData,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("updated successfully");
            history.push("athlete");
          } else {
            alert("some thing went wrong");
          }
        })
        .catch((error) => {
          throw error;
        });
    } else {
      const athleteData = new FormData();
      debugger;
      athleteData.append("name", athleteName);
      console.log(athleteData);
      await axios(
        `http://localhost:8000/api/v1//admin/categories/${athleteId}`,
        {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
          data: athleteData,
        }
      )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("updated successfully");
            history.push("athlete");
          } else {
            alert("some thing went wrong");
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  const ChangeHanlder = (event) => {
    const { name, value } = event.target;
    setEditAthlete((preValue) => {
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
              <h1 class="m-0">Athlete</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Athletes</li>
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
                  <h3 class="card-title">New Athlete</h3>
                </div>

                <form onSubmit={editAthleteHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        value={editAthlete && editAthlete.name}
                        ref={athleteInputName}
                        name="name"
                        onChange={ChangeHanlder}
                      />
                    </div>

                    <div class="form-group">
                      <label htmlFor="exampleInputFile">File input</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="exampleInputFile"
                            ref={athleteInputImg}
                            onChange={ChangeHanlder}
                          />
                          <label
                            class="custom-file-label"
                            htmlFor="exampleInputFile"
                            name="image"
                          >
                            Choose file
                          </label>
                        </div>
                        <div class="input-group-append">
                          <span class="input-group-text">Upload</span>
                        </div>
                      </div>
                      <img
                        src={
                          editAthlete &&
                          `http://localhost:8000/image/${editAthlete.image}`
                        }
                        style={{
                          height: "75px",
                          width: "70px",
                          borderRadius: "50%",
                        }}
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

export default EditAthlete;
