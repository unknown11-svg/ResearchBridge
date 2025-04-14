import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Login"; // <-- Add this line to import your Login component

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="702984125850-bl8l4jc151iqd94jcuahrkqa6u3lh5ho.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;

