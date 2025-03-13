import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./components/shared/Products.jsx";
import Orders from "./components/shared/Orders.jsx";
import Customers from "./components/shared/Customers.jsx";
import Messages from "./components/shared/Messages.jsx";
import Dashboard from "./components/shared/Dashboard.jsx";
import { Provider } from "react-redux";
import OpenSales from "./store/index.js";
import Analytics from "./components/shared/Analytics.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={OpenSales}>
    <RouterProvider router={router} />
  </Provider>
);
