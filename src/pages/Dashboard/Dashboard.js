import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [athleteCount, setAthleteCount] = useState(0);
  const [drillCount, setDrillCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllStatCount();
  }, []);

  const getAllStatCount = async () => {
    await axios
      .get("http://localhost:8000/api/v1//admin/users", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUserCount(response.data.data.user.length);
        console.log(response.data.data.user.length);
      });
    await axios
      .get("http://localhost:8000/api/v1//admin/athlete", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setAthleteCount(response.data.data.athlete.length);
        console.log(response.data.data.athlete.length);
      });
    await axios
      .get("http://localhost:8000/api/v1//admin/categories", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCategoriesCount(response.data.data.category.length);
      });
    await axios
      .get("http://localhost:8000/api/v1//admin/drills", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setDrillCount(response.data.data.drills.length);
      });
    await axios
      .get("http://localhost:8000/api/v1//admin/subscription", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setSubscriptionCount(response.data.data.subscriptions.length);
      });
  };

  return (
    <div>
      <div class="content-wrapper">
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Dashboard</h1>
              </div>

              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-4 col-6">
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>{userCount}</h3>

                    <p>Users </p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-person-add"></i>
                  </div>
                  <Link to="user" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              <div class="col-lg-4 col-6">
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>{categoriesCount}</h3>

                    <p>categories </p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-bag"></i>
                  </div>
                  <Link to="categories" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              <div class="col-lg-4 col-6">
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>{athleteCount}</h3>
                    <p>Athletes</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                  </div>
                  <Link to="athlete" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              <div class="col-lg-4 col-6">
                <div class="small-box bg-primary">
                  <div class="inner">
                    <h3>{drillCount}</h3>

                    <p>Drills</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                  </div>
                  <Link to="drills" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              <div class="col-lg-4 col-6">
                <div class="small-box bg-secondary">
                  <div class="inner">
                    <h3>{subscriptionCount}</h3>

                    <p>Subscription</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                  </div>
                  <Link to="subscription" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              <div class="col-lg-4 col-6">
                <div class="small-box bg-dark">
                  <div class="inner">
                    <h3>0</h3>

                    <p>Unique Visitors</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                  </div>
                  <a href="#" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="row">
              <section class="col-lg-7 connectedSortable">
                <div class="card direct-chat direct-chat-primary">
                  <div class="card-header">
                    <h3 class="card-title">Direct Chat</h3>

                    <div class="card-tools">
                      <span title="3 New Messages" class="badge badge-primary">
                        3
                      </span>
                      <button
                        type="button"
                        class="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-tool"
                        title="Contacts"
                        data-widget="chat-pane-toggle"
                      >
                        <i class="fas fa-comments"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="direct-chat-messages">
                      <div class="direct-chat-msg">
                        <div class="direct-chat-infos clearfix">
                          <span class="direct-chat-name float-left">
                            Alexander Pierce
                          </span>
                          <span class="direct-chat-timestamp float-right">
                            23 Jan 2:00 pm
                          </span>
                        </div>

                        <img
                          class="direct-chat-img"
                          src="dist/img/user1-128x128.jpg"
                          alt="message user image"
                        />

                        <div class="direct-chat-text">
                          Is this template really for free? That's unbelievable!
                        </div>
                      </div>

                      <div class="direct-chat-msg right">
                        <div class="direct-chat-infos clearfix">
                          <span class="direct-chat-name float-right">
                            Sarah Bullock
                          </span>
                          <span class="direct-chat-timestamp float-left">
                            23 Jan 2:05 pm
                          </span>
                        </div>

                        <img
                          class="direct-chat-img"
                          src="dist/img/user3-128x128.jpg"
                          alt="message user image"
                        />

                        <div class="direct-chat-text">
                          You better believe it!
                        </div>
                      </div>

                      <div class="direct-chat-msg">
                        <div class="direct-chat-infos clearfix">
                          <span class="direct-chat-name float-left">
                            Alexander Pierce
                          </span>
                          <span class="direct-chat-timestamp float-right">
                            23 Jan 5:37 pm
                          </span>
                        </div>

                        <img
                          class="direct-chat-img"
                          src="dist/img/user1-128x128.jpg"
                          alt="message user image"
                        />

                        <div class="direct-chat-text">
                          Working with AdminLTE on a great new app! Wanna join?
                        </div>
                      </div>

                      <div class="direct-chat-msg right">
                        <div class="direct-chat-infos clearfix">
                          <span class="direct-chat-name float-right">
                            Sarah Bullock
                          </span>
                          <span class="direct-chat-timestamp float-left">
                            23 Jan 6:10 pm
                          </span>
                        </div>

                        <img
                          class="direct-chat-img"
                          src="dist/img/user3-128x128.jpg"
                          alt="message user image"
                        />

                        <div class="direct-chat-text">I would love to.</div>
                      </div>
                    </div>

                    <div class="direct-chat-contacts">
                      <ul class="contacts-list">
                        <li>
                          <a href="#">
                            <img
                              class="contacts-list-img"
                              src="dist/img/user1-128x128.jpg"
                              alt="User Avatar"
                            />

                            <div class="contacts-list-info">
                              <span class="contacts-list-name">
                                Count Dracula
                                <small class="contacts-list-date float-right">
                                  2/28/2015
                                </small>
                              </span>
                              <span class="contacts-list-msg">
                                How have you been? I was...
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img
                              class="contacts-list-img"
                              src="dist/img/user7-128x128.jpg"
                              alt="User Avatar"
                            />

                            <div class="contacts-list-info">
                              <span class="contacts-list-name">
                                Sarah Doe
                                <small class="contacts-list-date float-right">
                                  2/23/2015
                                </small>
                              </span>
                              <span class="contacts-list-msg">
                                I will be waiting for...
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img
                              class="contacts-list-img"
                              src="dist/img/user3-128x128.jpg"
                              alt="User Avatar"
                            />

                            <div class="contacts-list-info">
                              <span class="contacts-list-name">
                                Nadia Jolie
                                <small class="contacts-list-date float-right">
                                  2/20/2015
                                </small>
                              </span>
                              <span class="contacts-list-msg">
                                I'll call you back at...
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img
                              class="contacts-list-img"
                              src="dist/img/user5-128x128.jpg"
                              alt="User Avatar"
                            />

                            <div class="contacts-list-info">
                              <span class="contacts-list-name">
                                Nora S. Vans
                                <small class="contacts-list-date float-right">
                                  2/10/2015
                                </small>
                              </span>
                              <span class="contacts-list-msg">
                                Where is your new...
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img
                              class="contacts-list-img"
                              src="dist/img/user6-128x128.jpg"
                              alt="User Avatar"
                            />

                            <div class="contacts-list-info">
                              <span class="contacts-list-name">
                                John K.
                                <small class="contacts-list-date float-right">
                                  1/27/2015
                                </small>
                              </span>
                              <span class="contacts-list-msg">
                                Can I take a look at...
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img
                              class="contacts-list-img"
                              src="dist/img/user8-128x128.jpg"
                              alt="User Avatar"
                            />

                            <div class="contacts-list-info">
                              <span class="contacts-list-name">
                                Kenneth M.
                                <small class="contacts-list-date float-right">
                                  1/4/2015
                                </small>
                              </span>
                              <span class="contacts-list-msg">
                                Never mind I found...
                              </span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="card-footer">
                    <form action="#" method="post">
                      <div class="input-group">
                        <input
                          type="text"
                          name="message"
                          placeholder="Type Message ..."
                          class="form-control"
                        />
                        <span class="input-group-append">
                          <button type="button" class="btn btn-primary">
                            Send
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </section>

              <section class="col-lg-5 connectedSortable">
                <div class="card bg-gradient-primary">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="fas fa-map-marker-alt mr-1"></i>
                      Visitors
                    </h3>

                    <div class="card-tools">
                      <button
                        type="button"
                        class="btn btn-primary btn-sm daterange"
                        title="Date range"
                      >
                        <i class="far fa-calendar-alt"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div
                      id="world-map"
                      style={{ height: "250px", width: "100%" }}
                    ></div>
                  </div>

                  <div class="card-footer bg-transparent">
                    <div class="row">
                      <div class="col-4 text-center">
                        <div id="sparkline-1"></div>
                        <div class="text-white">Visitors</div>
                      </div>

                      <div class="col-4 text-center">
                        <div id="sparkline-2"></div>
                        <div class="text-white">Online</div>
                      </div>

                      <div class="col-4 text-center">
                        <div id="sparkline-3"></div>
                        <div class="text-white">Sales</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
