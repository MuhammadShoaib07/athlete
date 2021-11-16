import React, { useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const AddSubscription = () => {
  const subscriptionInputName = useRef();
  const subscriptionInputPrice = useRef();
  const subscriptionInputDescription = useRef();

  const history = useHistory();
  const addSubscriptionHandler = (event) => {
    event.preventDefault();
    const subscriptionName = subscriptionInputName.current.value;
    const subscriptionPrice = subscriptionInputPrice.current.value;
    const subscriptionDescription = subscriptionInputDescription.current.value;

    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/api/v1//admin/subscription",
        {
          name: subscriptionName,
          price: subscriptionPrice,
          details: subscriptionDescription,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.data.message);
          history.push("subscription");
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
              <h1 class="m-0">Subscription </h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Subscription</li>
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
                  <h3 class="card-title">Subscription</h3>
                </div>

                <form onSubmit={addSubscriptionHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={subscriptionInputName}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Price</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter points"
                        ref={subscriptionInputPrice}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Description</label>
                      <textarea
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter points"
                        cols="5"
                        ref={subscriptionInputDescription}
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

export default AddSubscription;
