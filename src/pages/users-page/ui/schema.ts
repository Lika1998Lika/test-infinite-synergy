import * as yup from 'yup';

export const schema = yup.object().shape({
  firstName: yup.string().required('Введите своё имя').min(2, 'Минимальная длина 2 символов'),
  lastName: yup.string().required('Введите свою фамилию').min(2, 'Минимальная длина 2 символов'),
  age: yup.number().required('Введите свой возраст'),
  email: yup.string().required('Введите свой email').min(2, 'Минимальная длина 2 символов'),
  department: yup.string().required('Обязательное поле').min(2, 'Минимальная длина 2 символов'),
  company: yup.string().required('Обязательное поле').min(2, 'Минимальная длина 2 символов'),
  jobTitle: yup.string().required('Обязательное поле').min(2, 'Минимальная длина 2 символов'),
})