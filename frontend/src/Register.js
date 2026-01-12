import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const register = async () => {
    await axios.post("https://todo-backend-7et8.onrender.com/api/auth/register", data);
    window.location = "/";
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) =>
          setData({ ...data, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={data.email}
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />

      <input
        placeholder="Password"
        type="password"
        value={data.password}
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={register}>Register</button>

      <div className="link">
        <a href="/">Already have an account?</a>
      </div>
    </div>
  );
}
