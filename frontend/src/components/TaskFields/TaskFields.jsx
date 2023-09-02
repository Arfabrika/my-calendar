import React, {useState} from 'react';
import MyInput from "../MyInput/MyInput";
import Btn from "../btn/Btn";
import classes from "./TaskFields.module.css";
import { useForm } from "react-hook-form"
import Error from "../Error/Error";

const TaskFields = (props) => {
    const { register, handleSubmit, formState: {errors} } = useForm()
    const [task, setTask] = useState({name: '', deadline: ''})
    // const [oldTask, setOldTask] = useState(props.task ? props.task : {name: '', deadline: ''})

    function clearFields() {
        setTask({name: '', deadline: ''})
    }

    function addTask() {
        const newTask = {
            ...task, id: Date.now()
        }
        props.create(newTask)
        clearFields()
    }

    function editTask() {
        const newTask = {
            ...task
        }
        props.edit(newTask)
        props.hideFld()
        //clearFields()
    }

    function submit() {
        props.isEdit === true ? editTask() : addTask()
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div id={props.id} className={classes.taskFields} >
                <p>Название</p>
                <MyInput
                    inputobject={{...register("name", {required: true, maxLength: 20})}}
                    onChange={e => setTask({...task, name: e.target.value})}
                />

                <p>Крайний срок выполнения (в формате ДД.ММ.ГГГГ ЧЧ:ММ)</p>
                <MyInput
                    inputobject={
                    {...register("deadline",
                            {required: true,
                                pattern: /[0-3]\d.[0-1]\d.\d{4} [0-2]\d:[0-5]\d/
                                })
                    }}
                    onChange={e => {

                        setTask({...task, deadline: e.target.value})
                        //setOldTask({name: '', deadline: task.deadline})
                    }}
                    //value={oldTask.deadline}
                />
                <br/>
                {((errors.name && errors.name.type === "required") ||
                    (errors.deadline && errors.deadline.type === "required")) &&
                    <Error text={"Заполните все поля"}/>}
                {errors.deadline && errors.deadline.type === "pattern" &&
                    <Error text={"Введенная дата не совпадает с указанным форматом"}/>}
                {
                    props.isEdit === true
                        ?
                        <div>
                            <Btn type="submit">Сохранить</Btn>
                            <Btn onClick={() => props.hideFld()}>Отменить</Btn>
                        </div>
                        : <div>
                            <Btn type="submit">Добавить</Btn>
                          </div>
                }

            </div>
        </form>
    );
};

export default TaskFields;