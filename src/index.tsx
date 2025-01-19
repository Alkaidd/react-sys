import React from "react";
import ReactDOM from "react-dom/client";
import { route } from "./router/routes";
import { RouterProvider } from "react-router";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RouterProvider router={route} />
    </React.StrictMode>
  );
}
