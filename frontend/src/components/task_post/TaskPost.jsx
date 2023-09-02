import React, {useState} from 'react';
import TaskContent from "../task_content/TaskContent";
import Btn from "../btn/Btn";
import classes from "./TaskPost.module.css";
import TaskFields from "../TaskFields/TaskFields";

const TaskPost = (props) => {
    const [visible, setVisible] = useState(false)

    return (
        <div className={classes.TaskPost}>
            <TaskContent task={props.task}></TaskContent>
            <div className={classes.Btns}>
                <Btn onClick={() => setVisible(true)}>Изменить</Btn>
                <Btn onClick={() => props.delete(props.task)}>Удалить</Btn>
            </div>
            {visible && <TaskFields
                isEdit={true}
                hideFld={() => setVisible(false)}
                edit={(task) => props.edit(task, props.task.id)}
                task={props.task}></TaskFields>}
        </div>
    );
};

export default TaskPost;