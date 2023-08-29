import React, {useState} from 'react';
import TaskContent from "../task_content/TaskContent";
import Btn from "../btn/Btn";
import classes from "./TaskPost.module.css";

async function editTask() {
    //console.log(props)
}

const TaskPost = (props) => {
    return (
        <div className={classes.TaskPost}>
            <TaskContent task={props.task}></TaskContent>
            <div className={classes.Btns}>
                <Btn>Изменить</Btn>
                <Btn>Удалить</Btn>
            </div>
        </div>
    );
};

export default TaskPost;