import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const NewCategory = () => {
  const categoryInputName = useRef();
  const categoryInputImg = useRef();

  const history = useHistory();

  const newCategoryHandler = async (event) => {
    debugger;
    event.preventDefault();
    const categoryName = categoryInputName.current.value;
    const categoryImg = categoryInputImg.current.files[0];
    const categoryData = new FormData();
    categoryData.append("name", categoryName);
    categoryData.append("image", categoryImg);

    const token = localStorage.getItem("token");
    await axios("http://localhost:8000/api/v1//admin/categories", {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        Authorization: token,
      },
      data: categoryData,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          alert("item added successfully");
          history.push("categories");
        } else {
          alert("some thing went wrong");
        }
      })
      .catch((error) => {
        alert(error);
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

                <form onSubmit={newCategoryHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={categoryInputName}
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
                            ref={categoryInputImg}
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

export default NewCategory;
