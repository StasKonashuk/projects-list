import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    createProjectMessage: '',
    editProjectMessage: '',
    projectId: null
  },
  reducers: {
    getProjects(state, action) {
      state.projects = action.payload.projects;
    },
    createProject(state, action) {
      state.createProjectMessage = action.payload;
    },
    editProject(state, action) {
      state.editProjectMessage = action.payload;
    },
    refreshCreateProjectMessage(state) {
      state.createProjectMessage = null;
    },
    refreshEditProjectMessage(state) {
      state.editProjectMessage = null;
    },
    setProjectId(state, action) {
      state.projectId = action.payload;
    },
    removeProjectId(state) {
      state.projectId = null;
    }
  }
});

export const {
  getProjects,
  createProject,
  editProject,
  refreshCreateProjectMessage,
  refreshEditProjectMessage,
  setProjectId,
  removeProjectId
} = projectsSlice.actions;

export default projectsSlice.reducer;
