import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

const EditCategory = () => {
  const categoryEditName = useRef();
  const categoryEditImg = useRef();

  const location = useLocation();
  const history = useHistory();
  const [editCategory, SetEditCategory] = useState([]);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const token = localStorage.getItem("token");

    const categoryId = location.state.category_id;
    const result = await axios.get(
      `http://localhost:8000/api/v1//admin/categories/${categoryId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    SetEditCategory(result.data.data.category);
    console.log(result.data.data.category);
  };

  const editCategoryHandler = async (event) => {
    debugger;
    event.preventDefault();
    const token = localStorage.getItem("token");
    const categoryName = categoryEditName.current.value;
    const categoryImg = categoryEditImg.current.files[0];

    const categoryId = location.state.category_id;

    if (categoryImg !== undefined) {
      const categoryData = new FormData();
      categoryData.append("name", categoryName);
      categoryData.append("image", categoryImg);
      await axios(
        `http://localhost:8000/api/v1//admin/categories/${categoryId}`,
        {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
          data: categoryData,
        }
      )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("updated successfully");
            history.push("categories");
          } else {
            alert("some thing went wrong");
          }
        })
        .catch((error) => {
          throw error;
        });
    } else {
      const categoryData = new FormData();
      debugger;
      categoryData.append("name", categoryName);
      console.log(categoryData);
      await axios(
        `http://localhost:8000/api/v1//admin/categories/${categoryId}`,
        {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
          data: categoryData,
        }
      )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("updated successfully");
            history.push("categories");
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
    SetEditCategory((preValue) => {
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
                <li class="breadcrumb-item active">Athlete</li>
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

                <form onSubmit={editCategoryHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        onChange={ChangeHanlder}
                        name="name"
                        ref={categoryEditName}
                        value={editCategory && editCategory.name}
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
                            name="image"
                            ref={categoryEditImg}
                            // onChange={categoryChnageImgHanlder}
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
                      <img
                        src={
                          editCategory &&
                          `http://localhost:8000/image/${editCategory.image}`
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

export default EditCategory;
