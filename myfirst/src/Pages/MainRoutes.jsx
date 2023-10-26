import Login from "./Login";
import Details from "./Details";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Products from "./Products"
import RequirAuth from "../components/RequirAuth";
import Register from "./Register";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route
        path="/product/:id"
        element={
          <RequirAuth>
            <Details />
          </RequirAuth>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h3>Page Not Found</h3>} />
    </Routes>
  );
};

export default MainRoutes;
