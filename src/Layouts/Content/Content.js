import React, { Suspense } from "react";
import routes from "../../routes";
import { Switch, Route, Redirect } from "react-router";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

const Content = () => {
  return (
    <Suspense fallback={<p> Loading...!</p>}>
      <Switch>
        {routes.map((route, id) => {
          return (
            route.component && (
              <ProtectedRoute
                key={id}
                path={route.path}
                exact={route.exact}
                name={route.name}
                // render={(props) => <route.component {...props} />}
                component={route.component}
              />
            )
          );
        })}
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Suspense>
  );
};

export default Content;
