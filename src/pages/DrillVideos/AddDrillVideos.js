import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

const AddDrillVideos = () => {
  const thumbnailRef = useRef();
  const drillVideoRef = useRef();
  const speedLvlRef = useRef();
  const PremiumRef = useRef();
  const durationRef = useRef();

  const [drillThumbnail, setDrillThumbnail] = useState();
  const [drillvideo, setDrillVideo] = useState();
  const [speedLvl, setSpeedLvl] = useState();
  const [drill, setDrill] = useState();

  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    speedLevel();
  }, []);

  const speedLevel = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://localhost:8000/api/v1//admin/speed", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data.speedLevel);
          setSpeedLvl(response.data.data.speedLevel);
        }
      });
  };
  const addDrillVideoHandler = () => {
    debugger;
    const token = localStorage.getItem("token");
    const drillVideoId = location.state.drillVideo_id;

    const speedlvl = speedLvlRef.current.value;
    const isPremium = PremiumRef.current.value;
    const duration = durationRef.current.value;
    const thumnnail = thumbnailRef.current.files[0];
    const drillVideo = drillVideoRef.current.files[0];

    let thumbnailData = new FormData();

    thumbnailData.append("thumbnail", thumnnail);

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
      .then((imgResponse) => {
        let videoData = new FormData();

        videoData.append("video", drillVideo);

        axios
          .post(
            "http://localhost:8000/api/v1//admin/drills/upload",
            videoData,
            {
              headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((videoResponse) => {
            setDrillVideo(videoResponse.data.data.videos.video);
            setDrillThumbnail(imgResponse.data.data.videos.thumbnail);
            // uploadDrill({
            //   speedlvl,
            //   isPremium,
            //   duration,
            //   drillThumbnail,
            //   drillvideo,
            // });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((err) => {
        alert(err);
      });

    const res = {
      speedlvl,
      isPremium,
      duration,
      drillThumbnail,
      drillvideo,
    };
    axios
      .get(`http://localhost:8000/api/v1//admin/drills/${drillVideoId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          debugger;
          setDrill(response.data.data.drills);
          console.log(response.data.data.drills);
          const uploadDrill = new FormData();
          uploadDrill.append("name", drill.name);
          uploadDrill.append("athlete", drill.athlete._id);
          uploadDrill.append("category", drill.category._id);
          uploadDrill.append("diffcultyLevel", drill.difficultyLevel._id);
          uploadDrill.append("isPremium", drill.isPremium);
          uploadDrill.append("thumbnail", drill.thumbnail);
          uploadDrill.append("videos", [...drill.videos, res]);
          axios
            .post(
              `http://localhost:8000/api/v1//admin/drills/${drillVideoId}`,
              uploadDrill,
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((response) => {
              if (response.status === 200) {
                history.push(`/drills-videos/:${drillVideoId}`);
              }
            });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const uploadDrill = (videoObj) => {
    // debugger;
    // const drillVideoId = location.state.drillVideo_id;
    // console.log("in upload Drill");
    // const token = localStorage.getItem("token");
    // axios
    //   .get(`http://localhost:8000/api/v1//admin/drills/${drillVideoId}`, {
    //     headers: {
    //       Authorization: token,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setDrill(response.data.data.drills);
    //       console.log(response.data.data.drills);
    //       const uploadDrillData = FormData();
    //       uploadDrill.append("name", drill[0].name);
    //       uploadDrill.append("athlete", drill[0].athlete._id);
    //       uploadDrill.append("category", drill[0].category._id);
    //       uploadDrill.append("diffcultyLevel", drill[0].difficultyLevel._id);
    //       uploadDrill.append("isPremium", drill[0].isPremium);
    //       uploadDrill.append("thumbnail", drill[0].thumbnail);
    //       uploadDrill.append("videos", [...drill[0].videos, videoObj]);
    //       axios
    //         .post(
    //           `http://localhost:8000/api/v1//admin/drills/${drillVideoId}`,
    //           uploadDrill,
    //           {
    //             headers: {
    //               Authorization: token,
    //             },
    //           }
    //         )
    //         .then((response) => {
    //           if (response.status === 200) {
    //             history.push(`/drills-videos/:${drillVideoId}`);
    //           }
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
  };

  return (
    <div className="content-wrapper">
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
                <li class="breadcrumb-item active">Add Drill Video</li>
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

                <form onSubmit={addDrillVideoHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label htmlFor="exampleInputFile">Drill Thumnnail</label>
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
                      </div>
                    </div>

                    <div class="form-group">
                      <label htmlFor="exampleInputFile">Drill Video</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="exampleInputFile"
                            ref={drillVideoRef}
                          />
                          <label
                            class="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1">Speed Level </label>
                      <select
                        name="speed"
                        class="form-control"
                        ref={speedLvlRef}
                      >
                        {speedLvl && speedLvl.length > 0
                          ? speedLvl.map((speed, id) => {
                              return (
                                <option
                                  key={id}
                                  value={speed._id}
                                  key={speed.id}
                                  required
                                >
                                  {speed.name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Premium </label>
                      <br />
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value={true}
                        ref={PremiumRef}
                      />
                    </div>

                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1">Duration </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={durationRef}
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

export default AddDrillVideos;
