import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar from "../../assets/img/default-avatar.png";
import { useHistory } from "react-router";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      "http://localhost:8000/api/v1//admin/categories",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(result.data.data.category);
    setCategory(result.data.data.category);
  };

  const editcategoryhanlder = (id) => {
    history.push("editCategory", { category_id: id });
  };

  const deletecategoryhanlder = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = (id) => {
    const token = localStorage.getItem("token");
    // debugger;
    axios
      .delete(`http://localhost:8000/api/v1//admin/categories/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // alert(response.data.data.message);
        getAllCategories();
      });
  };
  let categories = null;

  if (category.length > 0) {
    categories = category.map((category, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{category.name}</td>
          <td>
            {category.image === undefined ? (
              <img
                src={avatar}
                style={{ height: "60px", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={`http://localhost:8000/image/${category.image}`}
                style={{ height: "60px", width: "60px", borderRadius: "50%" }}
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
                  editcategoryhanlder(category._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deletecategoryhanlder(category._id);
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

  const addCategoryHanlder = () => {
    history.push("addCategory");
  };

  return (
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Category </h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Category</li>
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
                    <h3 class="card-title">Category</h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addCategoryHanlder}
                    >
                      New Category
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table id="example2" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{categories}</tbody>
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

export default Categories;
