import React from "react";

const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const User = React.lazy(() => import("./pages/User/User"));
const Athlete = React.lazy(() => import("./pages/Athlete/Athlete"));
const Drills = React.lazy(() => import("./pages/Drills/Drill"));
const Categories = React.lazy(() => import("./pages/Categories/Categories"));
const DifficultytLevel = React.lazy(() =>
  import("./pages/DifficultyLevel/DifficultyLevel")
);
const SpeedLevel = React.lazy(() => import("./pages/SpeedLevel/SpeedLevel"));
const Subscription = React.lazy(() =>
  import("./pages/Subscription/Subscription")
);
const DrillVideos = React.lazy(() => import("./pages/DrillVideos/DrillVideos"));

/********************  Add Components ***************************/
const AddAthlete = React.lazy(() => import("./pages/Athlete/AddAthlete"));
const AddCategory = React.lazy(() => import("./pages/Categories/AddCategory"));
const AddDIfficultyLevel = React.lazy(() =>
  import("./pages/DifficultyLevel/AddDifficultyLevel")
);
const AddSpeedLevel = React.lazy(() =>
  import("./pages/SpeedLevel/AddSpeedLevel")
);
const AddSubscription = React.lazy(() =>
  import("./pages/Subscription/AddSubscription")
);
const AddDrill = React.lazy(() => import("./pages/Drills/AddDrill"));
const AddUser = React.lazy(() => import("./pages/User/Adduser"));
const AddDrillVideos = React.lazy(() =>
  import("./pages/DrillVideos/AddDrillVideos")
);

/*************** Edit Components *****************/
const EditCategory = React.lazy(() =>
  import("./pages/Categories/EditCategory")
);

const EidtDiffLvl = React.lazy(() =>
  import("./pages/DifficultyLevel/EditDifficulttyLevel")
);
const EditSpeed = React.lazy(() => import("./pages/SpeedLevel/EditSpeedLevel"));
const EditSubscription = React.lazy(() =>
  import("./pages/Subscription/EditSubscription")
);
const EditAthlete = React.lazy(() => import("./pages/Athlete/EditAthlete"));
const EditUser = React.lazy(() => import("./pages/User/EditUser"));
const EditDrill = React.lazy(() => import("./pages/Drills/EditDrill"));

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/user", name: "User", component: User },
  { path: "/athlete", name: "Athlete", component: Athlete },
  { path: "/drills", name: "Drills", component: Drills },
  { path: "/categories", name: "Categories", component: Categories },
  {
    path: "/difficultyLevel",
    name: "DifficultyLevel",
    component: DifficultytLevel,
  },
  { path: "/speedLevel", name: "SpeedLevel", component: SpeedLevel },
  { path: "/subscription", name: "Subscription", component: Subscription },
  {
    path: "/drills-videos/:id",
    name: "Drill Videos",
    component: DrillVideos,
    exact: true,
  },
  /********************* Addd Routes *********************** */
  { path: "/addAthlete", name: "Add Athlete", component: AddAthlete },
  { path: "/addCategory", name: "Add  Category", component: AddCategory },
  {
    path: "/addDifficultyLevel",
    name: "Add Difficultty Level",
    component: AddDIfficultyLevel,
  },
  { path: "/addSpeedLevel", name: "Add Speed Level", component: AddSpeedLevel },
  {
    path: "/addSubscription",
    name: "Add Subscription",
    component: AddSubscription,
  },
  { path: "/addDrill", name: "Add Drill", component: AddDrill },
  { path: "/addUser", name: "Add user ", component: AddUser },
  {
    path: "/addDrillVideos",
    name: "Add Drill Videos",
    component: AddDrillVideos,
  },

  /************************ Edit Routes ***************************** */
  {
    path: "/editAthlete",
    name: "Add Athlete",
    component: EditAthlete,
  },
  {
    path: "/editcategory",
    name: "Edit Category ",
    component: EditCategory,
  },
  {
    path: "/editDiffLvl",
    name: "Edit Difficulty Level",
    component: EidtDiffLvl,
  },
  {
    path: "/editSpeed",
    name: "Edit Speed Level",
    component: EditSpeed,
  },
  {
    path: "/editSubscription",
    name: "Edit Subscription",
    component: EditSubscription,
  },
  {
    path: "/editUser",
    name: "Edit user",
    component: EditUser,
  },
  {
    path: "/editDrill",
    name: "Edit Drill",
    component: EditDrill,
  },
];

export default routes;
