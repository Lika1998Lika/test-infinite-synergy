import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Введите своё имя').min(2, 'Минимальная длина 2 символов'),
  department: yup.string().required('Обязательное поле').min(2, 'Минимальная длина 2 символов'),
  company: yup.string().required('Обязательное поле').min(2, 'Минимальная длина 2 символов'),
  jobTitle: yup.string().required('Обязательное поле').min(2, 'Минимальная длина 2 символов'),
})