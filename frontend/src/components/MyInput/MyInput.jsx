import React from 'react';
import classes from "./MyInput.module.css";

const MyInput =(props) => {
    return (
        <div>
            <input
                className={classes.myinput}

                {...props.inputobject}
                onChange={props.onChange}
                value={props.value}
                />
        </div>
    );
}
export default MyInput;