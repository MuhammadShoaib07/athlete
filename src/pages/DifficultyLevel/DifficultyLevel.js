import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const DifficultyLevel = () => {
  const history = useHistory();
  const [difficulty, setDifficulty] = useState([]);

  useEffect(() => {
    getAllDeifficultyLevels();
  }, []);

  const getAllDeifficultyLevels = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      "http://localhost:8000/api/v1//admin/difficulty",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(result.data.data.difficulty);
    setDifficulty(result.data.data.difficulty);
  };

  const addDifficultyHanlder = () => {
    history.push("addDifficultyLevel");
  };

  const editDifficultyHnalder = (id) => {
    history.push("editDiffLvl", { diff_id: id });
  };
  const deleteDifficultyHanlder = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/v1//admin/difficulty/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // alert("deleted Successfully");
        getAllDeifficultyLevels();
      });
  };
  let difficultyLevel;

  if (difficulty.length > 0) {
    difficultyLevel = difficulty.map((difficulty, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{difficulty.name}</td>
          <td> {difficulty.points}</td>
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
                  editDifficultyHnalder(difficulty._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteDifficultyHanlder(difficulty._id);
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
  return (
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Diffculty Level</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Diffculty Level</li>
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
                    <h3 class="card-title">Diffculty Level</h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addDifficultyHanlder}
                    >
                      Add Diffculty Level
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table id="example2" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{difficultyLevel}</tbody>
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

export default DifficultyLevel;
