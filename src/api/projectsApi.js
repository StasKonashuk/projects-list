import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: builder => ({
    getProjects: builder.query({
      query: () => ({
        url: '/api/projects'
      })
    }),
    addProject: builder.mutation({
      query: ({
        id,
        companyName,
        email,
        projectAuthor,
        projectDescripton,
        projectLanguage,
        projectName,
        projectTasks,
        projectTitle,
        projectVersionSystemControl
      }) => ({
        url: '/api/create-project',
        method: 'post',
        body: {
          id,
          companyName,
          email,
          projectAuthor,
          projectDescripton,
          projectLanguage,
          projectName,
          projectTasks,
          projectTitle,
          projectVersionSystemControl
        }
      })
    }),
    editProject: builder.mutation({
      query: ({
        id,
        companyName,
        email,
        projectAuthor,
        projectDescripton,
        projectLanguage,
        projectName,
        projectTasks,
        projectTitle,
        projectVersionSystemControl
      }) => ({
        url: '/api/update-project',
        method: 'put',
        body: {
          id,
          companyName,
          email,
          projectAuthor,
          projectDescripton,
          projectLanguage,
          projectName,
          projectTasks,
          projectTitle,
          projectVersionSystemControl
        }
      })
    })
  })
});
