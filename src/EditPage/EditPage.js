import React, { useEffect } from 'react';
import { Form, Formik, Field, FieldArray } from 'formik';
import { NavLink } from 'react-router-dom';
import { TextField } from 'formik-mui';
import { object, string, array } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEditProjectMutation } from '../api/projectsApi';
import {
  editProject,
  refreshEditProjectMessage,
  removeProjectId
} from '../redux/projects/projects-reducer';
import style from './EditPage.module.css';

const EditPage = () => {
  const dispatch = useDispatch();

  const [updateProject] = useEditProjectMutation();

  useEffect(() => {
    dispatch(refreshEditProjectMessage());
  }, [dispatch]);

  const succesMsg = useSelector(state => state.projects.editProjectMessage);

  const project = useSelector(state =>
    state.projects.projects.filter(
      p => p.project_id === state.projects.projectId
    )
  );

  return (
    <div className={style.editFormContainer}>
      <div className={style.titleEditForm}>
        <h1>Edit project</h1>
      </div>
      {succesMsg ? (
        <div className={style.successEditProjectMessage}>
          <div>{succesMsg}</div>
          <NavLink className={style.backToProjectsButton} to="/projects-list">
            Back to projects
          </NavLink>
        </div>
      ) : (
        <Formik
          initialValues={{
            id: project[0].project_id,
            projectName: project[0].project_name,
            projectTitle: project[0].project_title,
            projectDescripton: project[0].project_description,
            projectAuthor: project[0].project_author,
            email: project[0].email,
            companyName: project[0].company_name,
            projectTasks: project[0].tasks.map(t => ({
              id: t.task_id,
              name: t.task_name,
              status: t.task_status
            })),
            projectLanguage: {
              status: project[0].project_language_status,
              language: project[0].project_language
            },
            projectVersionSystemControl:
              project[0].project_version_system_control
          }}
          validationSchema={object({
            projectName: string()
              .required('You need to provide Project Name')
              .min(4, 'Project Name need to be at least 4 characters')
              .max(25, 'Project Name is too long'),
            projectTitle: string()
              .required('You need to provide Project Title')
              .min(6, 'Project Title need to be at least 6 characters')
              .max(25, 'Project Title is too long'),
            projectDescripton: string()
              .required('You need to provide Project Description')
              .min(1, 'Project Description need to be at least 1 character')
              .max(140, 'Project Description is too long'),
            projectAuthor: string()
              .required('You need to provide Project Author')
              .min(4, 'Project Author need to be at least 4 characters')
              .max(25, 'Project Author is too long'),
            projectVersionSystemControl: string().required(
              'You need to provide Version Control System'
            ),
            email: string('Email must be a string'),
            companyName: string('Company name must be a string'),
            projectLanguage: object({
              language: string().required(
                'You need to provide Project language'
              )
            }),
            projectTasks: array(
              object({
                name: string()
                  .required('Task Name is needed')
                  .min(3, 'Task Name needs to be at least 3 character')
                  .max(20, 'Task Name is too long'),
                status: string()
                  .required('Task Status is needed')
                  .min(3, 'Task Status needs to be at least 3 character')
                  .max(12, 'Task Status is too long')
              })
            )
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const data = await updateProject(values);
              if (data.data) {
                dispatch(editProject(data.data.message));
                dispatch(removeProjectId());
              }
              setSubmitting(false);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ values, errors, handleChange, isSubmitting, dirty, isValid }) => (
            <Form>
              <div>
                <div>
                  <h3>Project Name:</h3>
                  <Field
                    fullWidth
                    name="projectName"
                    component={TextField}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3>Project Title:</h3>
                  <Field
                    fullWidth
                    name="projectTitle"
                    component={TextField}
                    label="Project Title"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3>Project Descripton:</h3>
                  <Field
                    fullWidth
                    name="projectDescripton"
                    component={TextField}
                    label="Project Descripton"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3>Project Author:</h3>
                  <Field
                    fullWidth
                    name="projectAuthor"
                    component={TextField}
                    label="Project Author"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3>Select Version Control System:</h3>
                  <Field
                    as="select"
                    name="projectVersionSystemControl"
                    className={style.selectField}
                  >
                    <option name="projectVersionSystemControl" value="">
                      Select a Version Control System
                    </option>
                    <option value="CVS">CVS</option>
                    <option value="SVN">SVN</option>
                    <option value="GIT">GIT</option>
                  </Field>
                  <div className={style.selectError}>
                    {errors.projectVersionSystemControl}
                  </div>
                </div>
                <div>
                  <h3>Email*:</h3>
                  <Field
                    fullWidth
                    name="email"
                    component={TextField}
                    label="Email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3>Company Name*:</h3>
                  <Field
                    fullWidth
                    name="companyName"
                    component={TextField}
                    label="Company Name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3>Project Language:</h3>
                  <div>
                    <div className={style.radioButtonContainer}>
                      <div>
                        <Field
                          type="radio"
                          name="projectLanguage.status"
                          value="popular"
                        />
                        Popular
                      </div>
                      <div>
                        <Field
                          type="radio"
                          name="projectLanguage.status"
                          value="others"
                        />
                        Others
                      </div>
                    </div>
                    <div>
                      {values.projectLanguage.status === 'popular' && (
                        <div>
                          <h3>Select Language:</h3>
                          <Field
                            as="select"
                            name="projectLanguage.language"
                            className={style.selectField}
                          >
                            <option name="projectLanguage.language" value="">
                              Select a Language of projects
                            </option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="C#">C#</option>
                            <option value="C++">C++</option>
                          </Field>
                          {errors.projectLanguage && (
                            <div className={style.selectError}>
                              {errors.projectLanguage.language}
                            </div>
                          )}
                        </div>
                      )}
                      {values.projectLanguage.status === 'others' && (
                        <div>
                          <h3>Input Language:</h3>
                          <Field
                            fullWidth
                            name="projectLanguage.language"
                            component={TextField}
                            label="Project Language"
                            onChange={handleChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <FieldArray name="projectTasks">
                    {({ push, remove }) => (
                      <div>
                        <div>
                          <h3>All Project Tasks:</h3>
                        </div>
                        {values.projectTasks.map((proj, index) => (
                          <div className={style.projectTasksContainer}>
                            <div className={style.projectTaskInputContainer}>
                              <Field
                                name={`projectTasks[${index}].name`}
                                component={TextField}
                                label="Task Name"
                                onChange={handleChange}
                              />
                            </div>
                            <div className={style.projectTaskInputContainer}>
                              <Field
                                name={`projectTasks[${index}].status`}
                                component={TextField}
                                label="Task Status"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                  <div className={style.submitButtonContainer}>
                    <button
                      disabled={isSubmitting || !dirty || !isValid}
                      type="submit"
                      className={style.submitButton}
                    >
                      {isSubmitting ? 'Loading' : 'Update Project'}
                    </button>
                    <NavLink
                      onClick={() => {
                        dispatch(removeProjectId());
                      }}
                      className={style.backToProjectsButton}
                      to="/projects-list"
                    >
                      Back to projects
                    </NavLink>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditPage;
