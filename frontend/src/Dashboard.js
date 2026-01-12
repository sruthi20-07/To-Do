import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("https://todo-backend-7et8.onrender.com/api/tasks", {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(
      "https://todo-backend-7et8.onrender.com/api/tasks",
      { title },
      { headers: { Authorization: token } }
    );

    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(
      `https://todo-backend-7et8.onrender.com/api/tasks/${id}`,
      {},
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `https://todo-backend-7et8.onrender.com/api/tasks/${id}`,
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  return (
    <div className="container">
      <h2>Your Tasks</h2>

      <input
        placeholder="Enter a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask} disabled={!title.trim()}>
        Add Task
      </button>

      <ul>
        {tasks.map((t) => (
          <li
            key={t._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textDecoration: t.completed ? "line-through" : "none",
              opacity: t.completed ? 0.6 : 1
            }}
          >
            <span>{t.title}</span>

            <div>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t._id)}
              />
              <button onClick={() => deleteTask(t._id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
