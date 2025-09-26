import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/authContext";
import Dashboard from "./components/shared/Dashboard.jsx";
import Products from "./components/shared/Products.jsx";
import Orders from "./components/shared/Orders.jsx";
import Customers from "./components/shared/Customers.jsx";
import Analytics from "./components/shared/Analytics.jsx";
import Messages from "./components/shared/Messages.jsx";
import Notifications from "./components/shared/Notifications.jsx";
import Settings from "./components/shared/Settings.jsx";
import Support from "./components/shared/Support.jsx";

import { Provider } from "react-redux";
import OpenSales from "./store/index.js";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Provider store={OpenSales}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<App />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="support" element={<Support />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
