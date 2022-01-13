import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    message: ''
  },
  reducers: {
    getProjects(state, action) {
      state.projects = action.payload.projects;
    },
    createProject(state, action) {
      state.message = action.payload;
    },
    refreshMessage(state) {
      state.message = null;
    }
  }
});

export const { getProjects, createProject, refreshMessage } =
  projectsSlice.actions;

export default projectsSlice.reducer;
