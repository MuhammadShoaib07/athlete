import React from "react";
import "./assets/fontawesome/css/all.min.css";
import "./assets/css/ionicons.min.css";
import "./assets/css/tempusdominus-bootstrap-4.min.css";
import "./assets/css/icheck-bootstrap.min.css";
import "./assets/css/adminlte.min.css";
import "./assets/css/OverlayScrollbars.min.css";
import "./assets/css/custome.css";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from "./Layouts/Layout";
import { Switch, Route } from "react-router";

function App() {
  return (
    <React.Suspense fallback={<p>Loading ..,!</p>}>
      <Switch>
        <Route
          exact
          path="/login"
          name="Login Page"
          render={(props) => <Login {...props} />}
        />
        <Route
          exact
          path="/register"
          name="Register Page"
          render={(props) => <Register {...props} />}
        />

        <Route path="/" name="Home" render={(props) => <Layout {...props} />} />
      </Switch>
    </React.Suspense>
  );
}

export default App;
