import React from 'react';
import style from './Content.module.css';

const Task = ({ taskName, taskStatus }) => {
  return (
    <div>
      <p>{taskName}</p>
      <p>{taskStatus}</p>
    </div>
  );
};

export default Task;
