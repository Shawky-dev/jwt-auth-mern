import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}
