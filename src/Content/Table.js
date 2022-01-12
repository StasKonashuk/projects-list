import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Project from './Project';
import { useGetProjectsQuery } from '../api/projectsApi';
import { getProjects } from '../redux/projects/projects-reducer';
import style from './Content.module.css';

const Table = () => {
  const dispaatch = useDispatch();

  const { data, isSuccess } = useGetProjectsQuery();

  useEffect(async () => {
    try {
      if (isSuccess) {
        const projects = await data;
        dispaatch(getProjects({ projects }));
      }
    } catch (error) {
      console.log(error);
    }
  });

  const projects = useSelector(state => state.projects.projects);

  const project = projects.map(p => (
    <Project
      key={p.project_id}
      companyName={p.company_name}
      email={p.email}
      projectAuthor={p.project_author}
      projectDescription={p.project_description}
      projectLanguage={p.project_language}
      projectName={p.project_name}
      projectTitle={p.project_title}
      projectVSC={p.project_version_system_control}
      projectTasks={p.tasks}
    />
  ));
  return (
    <table className={style.contentTable}>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Project Title</th>
          <th>Project Author</th>
          <th>Project Language</th>
          <th>Project VSC</th>
          <th>Company Name</th>
          <th>Email</th>
          <th>Project Description</th>
          <th>Project Tasks</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>{project}</tbody>
    </table>
  );
};

export default Table;
