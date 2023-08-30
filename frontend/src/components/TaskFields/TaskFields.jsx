import React, {useState} from 'react';
import MyInput from "../MyInput/MyInput";
import Btn from "../btn/Btn";
import classes from "./TaskFields.module.css";

const TaskFields = (props) => {
    const [task, setTask] = useState({name: '', deadline: ''})

    function clearFields() {
        setTask({name: '', deadline: ''})
    }

    function addTask(e) {
        e.preventDefault()
        const newTask = {
            ...task, id: Date.now()
        }
        props.create(newTask)
        clearFields()
    }

    function editTask(e) {
        e.preventDefault()
        const newTask = {
            ...task
        }
        props.edit(newTask)
        props.hideFld()
        clearFields()
    }

    return (
        <div>
            <div id={props.id} className={classes.taskFields} >
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
                {
                    props.isEdit === true
                        ?
                        <div>
                            <Btn onClick={editTask}>Сохранить</Btn>
                            <Btn onClick={() => props.hideFld()}>Отменить</Btn>
                        </div>
                        : <Btn onClick={addTask}>Добавить</Btn>
                }
            </div>
        </div>
    );
};

export default TaskFields;