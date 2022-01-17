import { object, string, array } from 'yup';

export const schema = object({
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
    language: string().required('You need to provide Project language'),
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
        .max(12, 'Task Status is too long'),
    })
  ),
});
