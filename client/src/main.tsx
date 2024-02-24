import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registro from "./vistas/Registro";
import Login from "./vistas/Login";
import Home from "./vistas/Home";
import DashBoard from "./vistas/DashBoard";
import Perfil from "./vistas/Perfil";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
