import React from 'react';
import Project from './Project';
import style from './Content.module.css';

const Content = () => {
  return (
    <div className={style.projectsContainer}>
      <div className={style.projectstList}>
        <Project />
        <Project />
        <Project />
      </div>
    </div>
  );
};

export default Content;
