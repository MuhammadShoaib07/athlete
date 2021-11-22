import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Subscription = () => {
  const [subscription, setSubscription] = useState([]);
  const [totalItems, setTotalItes] = useState();

  const history = useHistory();

  useEffect(() => {
    getAllSubscription();
  }, []);

  const getAllSubscription = async () => {
    const token = localStorage.getItem("token");

    const result = await axios.get(
      "http://localhost:8000/api/v1//admin/subscription",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(result);
    setSubscription(result.data.data.subscriptions);
    setTotalItes(result.data.data.subscriptions.length);
  };

  const handlePageChange = (pagNumber) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:8000/api/v1//admin/subscription/?page=${pagNumber}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data.subscriptions);
        setSubscription(response.data.data.subscriptions);
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

  const editSubscriptionHandler = (id) => {
    // console.log("clicked subs");
    history.push("editSubscription", { subscription_id: id });
  };

  const delteSubscriptionHandler = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/v1//admin/subscription/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // alert("deleted Successfully");
        getAllSubscription();
      });
  };

  let subscriptions = null;

  if (subscription.length > 0) {
    subscriptions = subscription.map((subs, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{subs.name}</td>
          <td> {subs.price}</td>
          <td> {subs.details}</td>
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
                  editSubscriptionHandler(subs._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  delteSubscriptionHandler(subs._id);
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
  const addSubscriptionHanlder = () => {
    history.push("addSubscription");
  };

  return (
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Subscriptions </h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Subscriptions</li>
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
                    <h3 class="card-title">Subscriptions </h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addSubscriptionHanlder}
                    >
                      Add subscription
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table id="example2" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{subscriptions}</tbody>
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

export default Subscription;
