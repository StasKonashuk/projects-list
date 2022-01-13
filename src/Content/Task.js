import React from 'react';
import style from './Content.module.css';

const Task = ({ taskName, taskStatus }) => {
  return (
    <div className={style.TaskContainer}>
      <div>
        <p>Name: {taskName},</p>
      </div>
      <div>
        <p>Status: {taskStatus};</p>
      </div>
    </div>
  );
};

export default Task;
