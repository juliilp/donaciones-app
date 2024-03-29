import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registro from "./vistas/Registro";
import Login from "./vistas/Login";
import Home from "./vistas/Home";
import DashBoard from "./vistas/DashBoard";
import Perfil from "./vistas/Perfil";
import axios from "axios";
import Header from "./components/Header/Header";
import AuthProvider from "./context/AuthProvider";
import PerfilDetail from "./vistas/PerfilDetail";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/:id" element={<PerfilDetail />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
