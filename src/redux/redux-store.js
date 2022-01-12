import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import projects from './projects/projects-reducer';

export const store = configureStore({
  reducer: {
    projects
  }
});

setupListeners(store.dispatch);
