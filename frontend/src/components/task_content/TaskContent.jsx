import React from 'react';

const TaskContent = ({children, task, ...props}) => {
    return (
        <div>
            {task.id}
            <br/>
            {task.name}
            <br/>
            {task.deadline}
        </div>
    );
};

export default TaskContent;