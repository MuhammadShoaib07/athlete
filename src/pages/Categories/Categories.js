import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import avatar from "../../assets/img/default-avatar.png";
import { useHistory } from "react-router";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [totalItems, setTotalItems] = useState();

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
    console.log(result.data);
    setTotalItems(result.data.count);
    setCategory(result.data.data.category);
  };

  const handlePageChange = (pagNumber) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:8000/api/v1//admin/categories/?page=${pagNumber}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data.category);
        setCategory(response.data.data.category);
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
                  <table
                    id="example2"
                    class="table table-bordered table-hover table-striped"
                  >
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

                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {handyMethod().map((item, id) => {
                      return (
                        <li class="page-item" key={id}>
                          <a
                            class="page-link "
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

export default Categories;
