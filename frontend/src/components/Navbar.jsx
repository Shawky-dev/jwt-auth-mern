import React from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="flex gap-4 text-blue-500">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}
