import React, {useState} from 'react'
import Btn from './components/btn/Btn';
import axios from "axios";
import TaskPost from "./components/task_post/TaskPost";
import TaskFields from "./components/TaskFields/TaskFields";
import Error from "./components/Error/Error";

function App() {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState('')

    async function fetchTasks() {
        document.getElementById("mainField").style.display = 'none'
        await axios.get("http://localhost:8000/api/tasks")
            .then((response) => {
                setTasks(response.data.tasks)
                setError('')
            })
            .catch((e) => {
                setErrorComm(e)
            })
    }

    function setErrorComm(e) {
        if (e.response.data.message !== undefined)
            setError(`Ошибка ${e.response.status}: ${e.response.data.message}`)
        else
            setError(`Ошибка ${e.response.status}: ${e.message}`)
    }

    function openAddTask() {
        document.getElementById("mainField").style.display = 'block'
        document.getElementById("tasksList").style.display = 'none'
        setError('')
    }

    async function addTask(newTask) {
        await axios.post("http://localhost:8000/api/tasks", {
            task: newTask
        })
            .then(()=>{
                setTasks([...tasks, newTask])
                setError('')
            })
            .catch((e) => {
                setErrorComm(e)
            })
    }

    function outTasks() {
        document.getElementById("tasksList").style.display = 'block'
        document.getElementById("mainField").style.display = 'none'
        setError('')
    }

    async function deleteTask(task) {
        await axios.delete(`http://localhost:8000/api/tasks/${task.id}`)
            .then((response) => {
                setTasks(tasks.filter(t => t.id !== task.id))
                setError('')
            })
            .catch((e) => {
                setErrorComm(e)
            })
    }

    async function editTask(task, id) {
        await axios.put("http://localhost:8000/api/tasks", {
            task: task,
            id: id
        })
            .then(()=>{
                var tmptasks = tasks.map(a => Object.assign({}, a))
                tmptasks.forEach((t) => {
                    if (t.id === id) {
                        for (let key in task) {
                            t[key] = task[key]
                        }
                    }
                })
                setTasks(tmptasks)
                setError('')
                outTasks()
            })
            .catch((e) => {
                setErrorComm(e)
            })
    }

  return (
    <div className="App">
        <h1>Задачи</h1>
        <Btn onClick={fetchTasks}>Загрузить задачи</Btn>
        <Btn onClick={outTasks}>Вывести задачи</Btn>
        <Btn onClick={openAddTask}>Добавить задачу</Btn>
        <Error text={error}></Error>
        <div id="tasksList">
        {
            tasks.map((task) =>
            <TaskPost
                task={task}
                key = {task.id}
                delete={deleteTask}
                edit={editTask}></TaskPost>
        )}
        </div>
        <TaskFields create={addTask} id="mainField"/>
    </div>
  );
}

export default App;
