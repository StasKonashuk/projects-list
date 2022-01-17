import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setProjectId } from '../redux/projects/projects-reducer';
import style from './Content.module.css';
import Task from './Task';

const Project = ({
  projectId,
  companyName,
  email,
  projectAuthor,
  projectDescription,
  projectLanguage,
  projectName,
  projectTitle,
  projectVSC,
  projectTasks
}) => {
  const dispatch = useDispatch();
  const task = projectTasks.map(t => (
    <Task key={t.task_id} taskName={t.task_name} taskStatus={t.task_status} />
  ));
  return (
    <tr className={style.projectContainer}>
      <th>{projectName}</th>
      <th>{projectTitle}</th>
      <th>{projectAuthor}</th>
      <th>{projectLanguage}</th>
      <th>{projectVSC}</th>
      <th>{companyName}</th>
      <th>{email}</th>
      <th>{projectDescription}</th>
      <th>{task}</th>
      <th>
        <NavLink
          onClick={() => dispatch(setProjectId(projectId))}
          className={style.editButton}
          to="/edit"
        >
          Edit
        </NavLink>
      </th>
    </tr>
  );
};

export default Project;
