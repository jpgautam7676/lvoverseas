import React from "react";
import { Routes, Route } from "react-router-dom";
import Protected from "./Protected";
import Singup from "./Singup";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Singup" element={<Singup />} />
      <Protected path="/protected" element={<ProtectedRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
