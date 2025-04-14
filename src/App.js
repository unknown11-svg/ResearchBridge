import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./pages/login.js";
import HomePage from "./pages/homepage.js";
import RolePage from "./pages/RolePicker.js";
import ReasercherPage from "./pages/ReseacherForm.js";
import AdminPage from "./pages/adminform.js";
import ReviewerPage from "./pages/reviewform.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/role",
      element: <RolePage />,
    },
    {
      path: "/researcher",
      element: <ReasercherPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
    {
      path: "/reviewer",
      element: <ReviewerPage />,
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="702984125850-bl8l4jc151iqd94jcuahrkqa6u3lh5ho.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
