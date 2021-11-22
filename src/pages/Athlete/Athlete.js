import axios from "axios";
import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/default-avatar.png";
import { useHistory } from "react-router";

const Athlete = () => {
  const [athlete, setAthlete] = useState([]);
  const [totalItems, setTotalItems] = useState();

  const history = useHistory();

  useEffect(() => {
    getAllAthletes();
  }, []);

  const getAllAthletes = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      "http://localhost:8000/api/v1//admin/athlete",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // console.log(result.data.data.athlete);
    setAthlete(result.data.data.athlete);
    setTotalItems(result.data.count);
  };

  const handlePageChange = (pagNumber) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/v1//admin/athlete/?page=${pagNumber}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setAthlete(response.data.data.athlete);
      });
  };

  const handyMethod = () => {
    debugger;
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

  const editHandler = (id) => {
    history.push("editAthlete", { athlete_id: id });
  };

  const deleteHanlder = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/v1//admin/athlete/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // alert("deleted Successfully");
        getAllAthletes();
      });
  };
  let athletes = null;

  if (athlete.length > 0) {
    athletes = athlete.map((athlete, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{athlete.name}</td>
          <td>
            {athlete.image === undefined ? (
              <img
                src={avatar}
                style={{ height: "60px", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={`http://localhost:8000/image/${athlete.image}`}
                style={{ height: "60px", borderRadius: "50%" }}
              />
            )}
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
                  editHandler(athlete._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteHanlder(athlete._id);
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

  const addAthleteHanlder = () => {
    history.push("addAthlete");
  };

  const colums = [
    {
      label: "Name",
      field: "name",
      width: 150,
      attributes: {
        "aria-controls": "DataTable",
        "aria-label": "Name",
      },
    },
    {
      label: "Position",
      field: "position",
      width: 270,
    },
    {
      label: "Office",
      field: "office",
      width: 200,
    },
    {
      label: "Age",
      field: "age",
      sort: "asc",
      width: 100,
    },
    {
      label: "Start date",
      field: "date",
      sort: "disabled",
      width: 150,
    },
    {
      label: "Salary",
      field: "salary",
      sort: "disabled",
      width: 100,
    },
  ];

  return (
    <div class="content-wrapper">
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
              <div class="card">
                <div class="card-header">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 class="card-title">Athletes</h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addAthleteHanlder}
                    >
                      Add Athlete
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table
                    id="example2"
                    class="table table-bordered table-hover table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody> {athletes}</tbody>
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

export default Athlete;
