import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Content.module.css';
import Table from './Table';

const Content = () => {
  return (
    <div className={style.projectsContainer}>
      <Table />
      <NavLink className={style.createProjectButton} to="/create">
        Create Project
      </NavLink>
    </div>
  );
};

export default Content;
