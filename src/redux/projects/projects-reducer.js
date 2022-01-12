import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: []
  },
  reducers: {
    getProjects(state, action) {
      state.projects = action.payload.projects;
    }
  }
});

export const { getProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
