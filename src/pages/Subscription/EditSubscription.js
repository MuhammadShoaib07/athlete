import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

const EditSubscription = () => {
  const subsNameRef = useRef();
  const subsPriceRef = useRef();
  const subsDescriptionRef = useRef();

  const location = useLocation();
  const history = useHistory();
  const [editSubscription, setSubscription] = useState();

  useEffect(() => {
    getSubscriptionData();
  }, []);

  const getSubscriptionData = async () => {
    const token = localStorage.getItem("token");

    const subscriptionId = location.state.subscription_id;
    console.log(subscriptionId);
    const result = await axios.get(
      `http://localhost:8000/api/v1//admin/subscription/${subscriptionId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(result.data.data.subscriptions);
    setSubscription(result.data.data.subscriptions);
  };

  const editSubscriptionHandler = async (event) => {
    debugger;
    event.preventDefault();
    const token = localStorage.getItem("token");
    const subsName = subsNameRef.current.value;
    const subsPrice = subsPriceRef.current.value;
    const subsDetails = subsDescriptionRef.current.value;

    const subscriptionId = location.state.subscription_id;

    await axios(
      `http://localhost:8000/api/v1//admin/subscription/${subscriptionId}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        data: {
          name: subsName,
          price: subsPrice,
          details: subsDetails,
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("updated successfully");
          history.push("subscription");
        } else {
          alert("some thing went wrong");
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  const ChangeHanlder = (event) => {
    const { name, value } = event.target;
    setSubscription((preValue) => {
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

                <form onSubmit={editSubscriptionHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        value={editSubscription && editSubscription.name}
                        name="name"
                        ref={subsNameRef}
                        onChange={ChangeHanlder}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Price</label>
                      <input
                        type="number"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter points"
                        value={editSubscription && editSubscription.price}
                        name="price"
                        ref={subsPriceRef}
                        onChange={ChangeHanlder}
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
                        value={editSubscription && editSubscription.details}
                        name="details"
                        ref={subsDescriptionRef}
                        onChange={ChangeHanlder}
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

export default EditSubscription;
