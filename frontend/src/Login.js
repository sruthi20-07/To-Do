import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("https://todo-backend-7et8.onrender.com/api/auth/login", {
      email,
      password
    });
    localStorage.setItem("token", res.data.token);
    window.location = "/dashboard";
  };

  return (
  <div className="container">
    <h2>Login</h2>

    <input
      placeholder="Email"
      onChange={e => setEmail(e.target.value)}
    />

    <input
      placeholder="Password"
      type="password"
      onChange={e => setPassword(e.target.value)}
    />

    <button onClick={login}>Login</button>

    <div className="link">
      <a href="/register">Create an account</a>
    </div>
  </div>
);

}
