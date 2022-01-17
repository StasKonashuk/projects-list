import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import projects from './projects/projects-reducer';
import { projectsApi } from '../api/projectsApi';

export const store = configureStore({
  reducer: {
    projects,
    [projectsApi.reducerPath]: projectsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(projectsApi.middleware)
});

setupListeners(store.dispatch);
