import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks"; // Adjust if your backend is hosted elsewhere

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task._id}>
                            <strong>{task.title}</strong> - {task.description} 
                            <span style={{ color: task.completed ? "green" : "red" }}>
                                {task.completed ? " (Completed)" : " (Pending)"}
                            </span>
                        </li>
                    ))
                ) : (
                    <p>No tasks available</p>
                )}
            </ul>
        </div>
    );
}

export default TaskList;
