import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Project from './Project';
import style from './Content.module.css';
import { useGetProjectsQuery } from '../api/projectsApi';
import { getProjects } from '../redux/projects/projects-reducer';

const Content = () => {
  const dispaatch = useDispatch();

  const { data, isSuccess } = useGetProjectsQuery();

  useEffect(async () => {
    try {
      if (isSuccess) {
        const projects = await data;
        console.log(data);
        dispaatch(getProjects({ projects }));
      }
    } catch (error) {
      console.log(error);
    }
  });

  const projects = useSelector(state => state.projects.projects);

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
