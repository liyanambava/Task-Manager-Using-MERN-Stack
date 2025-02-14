import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please enter both fields");

    const newTask = { title, description, completed: false };

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();
      setTasks([...tasks, data]); 
      setTitle("");
      setDescription(""); // Clear form fields
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Mark Task as Completed
  const toggleCompleteTask = async (id, completed) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      setTasks(tasks.map(task => 
        task._id === id ? { ...task, completed: !completed } : task
      )); // Update UI
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });

      setTasks(tasks.filter(task => task._id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            {/* Checkbox to Mark Task as Completed */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleteTask(task._id, task.completed)}
            />

            {/* Task Details */}
            <span className={task.completed ? "completed" : ""}>
              {task.title}: {task.description}
            </span>

            {/* Delete Button */}
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
