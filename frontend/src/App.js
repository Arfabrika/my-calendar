import React, {useState} from 'react'
import Btn from './components/btn/Btn';
import axios from "axios";
import TaskPost from "./components/task_post/TaskPost";
import TaskFields from "./components/TaskFields/TaskFields";

function App() {
    const [tasks, setTasks] = useState([])
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    };

    async function fetchTasks() {
        document.getElementById("tasksList").style.display = 'block'
        document.getElementById("mainField").style.display = 'none'

        const response = await axios.get("http://localhost:8000/api/tasks", config)
        setTasks(response.data.tasks)
    }

    function openAddTask() {
        document.getElementById("mainField").style.display = 'block'
        document.getElementById("tasksList").style.display = 'none'
    }

    async function addTask(newTask) {
        //console.log(newTask)
        setTasks([...tasks, newTask])
        console.log(tasks)
        console.log(newTask)
        const response = await axios.post("http://localhost:8000/api/tasks", {
            task: newTask
        })
        console.log(response)

    }

  return (
    <div className="App">
        <h1>Задачи</h1>
        <Btn onClick={fetchTasks}>Загрузить задачи</Btn>
        <Btn onClick={openAddTask}>Добавить задачу</Btn>
        <div id="tasksList">
        {
            tasks.map((task) =>
            <TaskPost task={task} key = {task.id}></TaskPost>
        )}
        </div>
        <div ><TaskFields create={addTask} id="mainField"/></div>

    </div>
  );
}

export default App;
