import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const Drill = () => {
  const [drill, setDrill] = useState([]);
  const [totalItems, SetTotalItems] = useState();

  const history = useHistory();

  useEffect(() => {
    getAllDrills();
  }, []);

  const getAllDrills = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      "http://localhost:8000/api/v1//admin/drills",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(result.data.data.drills);
    setDrill(result.data.data.drills);
    SetTotalItems(result.data.count);
  };

  const handlePageChange = (pagNumber) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/v1//admin/drills/?page=${pagNumber}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setDrill(response.data.data.drills);
      });
  };

  const handyMethod = () => {
    const total = totalItems;
    const itemPerpage = 10;
    const divide = total / itemPerpage;
    let result = Math.ceil(divide);
    let pages = [];
    for (let i = 0; i < result; i++) {
      pages[i] = i + 1;
    }
    console.log(pages);
    return pages;
  };

  const editDrillhanlder = (id) => {
    history.push("editDrill", { drill_id: id });
  };

  const delteDrillHandler = () => {};

  let drills = null;

  if (drill.length > 0) {
    drills = drill.map((drill, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>
            <Link to={`drills-videos/${drill._id}`}>{drill.name} </Link>
          </td>
          <td>{drill.athlete.name}</td>
          <td> {drill.category.name}</td>
          <td> {drill.difficultyLevel.name}</td>
          <td> {drill.videos ? drill.videos.length : 0}</td>
          <td>
            <img
              src={`http://localhost:8000/image/drills/${drill.thumbnail}`}
              style={{ height: "60px", width: "60px" }}
            />
          </td>
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
                  editDrillhanlder(drill._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  delteDrillHandler(drill._id);
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
  const addDrillHandler = () => {
    history.push("addDrill");
  };

  return (
    <div class="content-wrapper">
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
              <div class="card">
                <div class="card-header">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 class="card-title">Drills</h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addDrillHandler}
                    >
                      Add Drill
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table id="example2" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Athlete Name</th>
                        <th>Category Name</th>
                        <th>Difficulty Level </th>
                        <th>Total videos</th>
                        <th>Thumbnail</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{drills}</tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {handyMethod().map((item, id) => {
                      return (
                        <li class="page-item" key={id}>
                          <a
                            class="page-link"
                            onClick={() => handlePageChange(item)}
                          >
                            {item}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Drill;
