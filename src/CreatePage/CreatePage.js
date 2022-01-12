import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';
import { Form, Formik, Field, FieldArray } from 'formik';
import { TextField } from 'formik-mui';
import { object, number, string, boolean, array } from 'yup';
import style from './CreatePage.module.css';

const CreatePage = () => {
  return (
    <div className={style.createFormContainer}>
      <div className={style.titleCreateForm}>
        <h1>Create project</h1>
      </div>
      <Formik
        initialValues={{
          id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
          projectName: '',
          projectTitle: '',
          projectDescripton: '',
          projectAuthor: '',
          email: '',
          companyName: '',
          projectTasks: [
            {
              id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
              name: '',
              status: ''
            }
          ],
          projectLanguage: { status: '', language: '' },
          projectVersionSystemControl: ''
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
            language: string().required('You need to provide Project language')
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
                .max(10, 'Task Status is too long')
            })
          )
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <h3>Project Name:</h3>
                <Field
                  fullWidth
                  name="projectName"
                  component={TextField}
                  label="Project Name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <h3>Project Title:</h3>
                <Field
                  fullWidth
                  name="projectTitle"
                  component={TextField}
                  label="Project Title"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <h3>Project Descripton:</h3>
                <Field
                  fullWidth
                  name="projectDescripton"
                  component={TextField}
                  label="Project Descripton"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <h3>Project Author:</h3>
                <Field
                  fullWidth
                  name="projectAuthor"
                  component={TextField}
                  label="Project Author"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
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
              </Grid>
              <Grid item>
                <h3>Email*:</h3>
                <Field
                  fullWidth
                  name="email"
                  component={TextField}
                  label="Email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <h3>Company Name*:</h3>
                <Field
                  fullWidth
                  name="companyName"
                  component={TextField}
                  label="Company Name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
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
                      <Grid item>
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
                      </Grid>
                    )}
                    {values.projectLanguage.status === 'others' && (
                      <Grid item>
                        <h3>Input Language:</h3>
                        <Field
                          fullWidth
                          name="projectLanguage.language"
                          component={TextField}
                          label="Project Language"
                          onChange={handleChange}
                        />
                      </Grid>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid item>
                <FieldArray name="projectTasks">
                  {({ push, remove }) => (
                    <>
                      <Grid item>
                        <h3>All Project Tasks:</h3>
                      </Grid>
                      {values.projectTasks.map((proj, index) => (
                        <Grid key={proj.id} container item>
                          <Grid item xs={12} sm="auto" sx={{ mr: 2, mb: 2 }}>
                            <Field
                              name={`projectTasks[${index}].name`}
                              component={TextField}
                              label="Task Name"
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm="auto" sx={{ mr: 2, mb: 2 }}>
                            <Field
                              name={`projectTasks[${index}].status`}
                              component={TextField}
                              label="Task Status"
                              onChange={handleChange}
                            />
                          </Grid>

                          <Grid item sx={{ mt: 2 }}>
                            <Button
                              color="error"
                              variant="outlined"
                              onClick={() => remove(index)}
                            >
                              Delete task
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid item>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => push({ name: '', status: '' })}
                        >
                          Add Task
                        </Button>
                      </Grid>
                    </>
                  )}
                </FieldArray>
                <div className={style.submitButtonContainer}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size="1rem" />
                      ) : undefined
                    }
                  >
                    {isSubmitting ? 'Loading' : 'Create Project'}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePage;
