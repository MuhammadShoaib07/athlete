import React, { Suspense } from "react";
import routes from "../../routes";
import { Switch, Route, Redirect } from "react-router";
const Content = () => {
  return (
    <Suspense fallback={<p> Loading...!</p>}>
      <Switch>
        {routes.map((route, id) => {
          return (
            route.component && (
              <Route
                key={id}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => <route.component {...props} />}
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
