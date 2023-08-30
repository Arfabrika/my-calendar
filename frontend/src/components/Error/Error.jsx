import React from 'react';
import classes from "./Error.module.css";

const Error = (props) => {
    return (
        <div className={classes.Err}>
            {props.text}
        </div>
    );
};

export default Error;