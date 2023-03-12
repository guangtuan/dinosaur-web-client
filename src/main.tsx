import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SpaceEntry from "./space/spaceEntry";
import SpaceDetail from "./spaceDetail/spaceDetail";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SpaceEntry />,
  },
  {
    path: "/spaceDetail",
    element: <SpaceDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
