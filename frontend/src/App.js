import React, {useState} from 'react'
import Btn from './components/btn/Btn';
import axios from "axios";
import TaskPost from "./components/task_post/TaskPost";

function App() {
    const [tasks, setTasks] = useState([])

    async function fetchTasks() {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };
        const response = await axios.get("http://localhost:8000/api/tasks", config)
        setTasks(response.data.tasks)
    }

  return (
    <div className="App">
        <h1>Задачи</h1>
        <Btn onClick={fetchTasks}>Загрузить задчаи</Btn>
        {
            tasks.map((task) =>
            <TaskPost task={task} key = {task.id}></TaskPost>
        )}

    </div>
  );
}

export default App;
