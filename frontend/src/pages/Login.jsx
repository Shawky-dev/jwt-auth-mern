import { useState } from "react"
import axios from "axios"
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const loginUser = (e) => {
    e.preventDefault()
    axios.get("/")
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="text"
          placeholder="enter email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>password</label>
        <input
          type="text"
          placeholder="enter password"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
