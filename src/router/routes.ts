import App from "@/App";
// import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const route = createBrowserRouter([
  {
    path: "*",
    Component: App,
    children: [{}],
  },
]);

export { route };
