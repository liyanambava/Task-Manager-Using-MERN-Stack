import { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    setTasks([...tasks, data]);
    setNewTask({ title: "", description: "" });
  };

  return (
    <div>
      <h2>Task Manager</h2>

      {/* Add Task Form */}
      <input
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        placeholder="Enter task title"
      />
      <input
        type="text"
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        placeholder="Enter task description"
      />
      <button onClick={handleAddTask}>Add Task</button>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}: {task.description} -{" "}
            {task.completed ? "Completed ✅" : "Pending ⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
