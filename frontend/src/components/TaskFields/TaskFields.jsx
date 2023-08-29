import React, {useState} from 'react';
import MyInput from "../MyInput/MyInput";
import Btn from "../btn/Btn";
import classes from "./TaskFields.module.css";

const TaskFields = (props) => {
    const [task, setTask] = useState({name: '', deadline: ''})
    function addTask(e) {
        e.preventDefault()
        const newTask = {
            ...task, id: Date.now()
        }
        props.create(newTask)
        setTask({name: '', deadline: ''})
    }

    return (

        <div id={props.id} className={classes.taskFields}>
            <p>Название</p>
            <MyInput
                value={task.name}
                onChange={e => setTask({...task, name: e.target.value})}
            />
            <p>Крайний срок выполнения</p>
            <MyInput
                value={task.deadline}
                onChange={e => setTask({...task, deadline: e.target.value})}
            />
            <br/>
            <Btn onClick={addTask}>Добавить</Btn>
        </div>
    );
};

export default TaskFields;