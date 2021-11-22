import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory, Redirect } from "react-router";

const DrillVideos = () => {
  const [drill, setDrill] = useState();
  const params = useParams();
  const history = useHistory();

  const drillId = params.id;
  console.log(drillId);

  useEffect(() => {
    getAllDrillVideos();
  }, []);

  const getAllDrillVideos = async () => {
    const token = localStorage.getItem("token");
    const result =
      drillId &&
      (await axios.get(
        `http://localhost:8000/api/v1//admin/drills/${drillId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      ));
    console.log(result.data.data.drills);
    setDrill(result.data.data.drills);
  };

  const deleteHanlder = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = () => {};

  let drills = null;

  if (drill && drill.length > 0) {
    drills = drill.map((drill, id) => {
      if (drill.videos && drill.videos.length > 0) {
        return drill.videos.map((video, id) => {
          return (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{drill.name} </td>
              <td>{video.speedLevel.name} </td>
              <td>
                <img
                  src={`http://localhost:8000/image/drills/${video.thumbnail}`}
                  width="150px"
                  heigth="150px"
                />
              </td>
              <td>
                <video width="270" height="120" controls>
                  <source
                    src={`http://localhost:8000/image/drills/${video.video}`}
                    type="video/mp4"
                  />
                </video>
              </td>
              <td>{video.duration} </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteHanlder(drill._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        });
      }
    });
  }

  const addDrillVideoHanlder = (id) => {
    history.replace("/addDrillVideos", { drillVideo_id: id });
  };
  return (
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Drill Videos</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Drill Videos</li>
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
                    <h3 class="card-title">Videos </h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        addDrillVideoHanlder(drillId);
                      }}
                    >
                      Add Videos
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table id="example2" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Drill Name</th>
                        <th>Speed Level </th>
                        <th>Thumbnail</th>
                        <th>Videos</th>
                        <th>Duration</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody> {drills}</tbody>
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

export default DrillVideos;
