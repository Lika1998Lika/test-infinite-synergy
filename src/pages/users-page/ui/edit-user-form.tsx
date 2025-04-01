import { yupResolver } from "@hookform/resolvers/yup";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useForm } from 'react-hook-form';
import { schema } from "./schema";
import { UsersType } from "../../../entities/users";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../entities/users/api/service";
import { useEffect } from "react";

type Props = {
  userId: number,
  onSubmit: (value: Omit<UsersType, 'id'>) => void;
  onCancel: () => void;
}
export const EditUserForm = ({ userId, onCancel, onSubmit }: Props) => {

  const { data } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  console.log(data);
  const formMethodsEdit = useForm({
    resolver: yupResolver(schema),
    defaultValues: {} as UsersType,
  });

  useEffect(() => {
    if (data) {
      formMethodsEdit.reset(data)
    }
  }, [data, formMethodsEdit])

  // const handleUpdateUser = async (values: Omit<UsersType, 'id'>) => {
  //   if (!userId) return;
  //   await updateUser({ id: userId, ...values });
  //   onCancel();
  // };

  const handleSubmit = formMethodsEdit.handleSubmit(
    async (value) => {
      // Обновляем пользователя
      try {
        await updateUser({ id: userId, ...value }).unwrap();
        onSubmit(value); // Применить изменения
        formMethodsEdit.reset();
        onCancel(); // Закрыть модальное окно
      } catch (error) {
        console.error(error);
      }
    },
    (error) => console.error(error)
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" gap={3} sx={{ width: "500px", p: 2 }}>
        <TextField
          error={!!formMethodsEdit.formState.errors['lastName']}
          helperText={formMethodsEdit.formState.errors['lastName']?.message}
          label="Фамилия"
          {...formMethodsEdit.register('lastName')}
          sx={{ p: 0 }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />
        <TextField
          error={!!formMethodsEdit.formState.errors['firstName']}
          helperText={formMethodsEdit.formState.errors['firstName']?.message}
          label="Имя"
          {...formMethodsEdit.register('firstName')}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />
        <TextField
          error={!!formMethodsEdit.formState.errors['age']}
          helperText={formMethodsEdit.formState.errors['age']?.message}
          type="number"
          label="Возраст"
          {...formMethodsEdit.register('age')}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />
        <TextField
          error={!!formMethodsEdit.formState.errors['email']}
          helperText={formMethodsEdit.formState.errors['email']?.message}
          label="email"
          {...formMethodsEdit.register('email')}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />
        <TextField
          error={!!formMethodsEdit.formState.errors['company']}
          helperText={formMethodsEdit.formState.errors['company']?.message}
          label="Компания"
          {...formMethodsEdit.register('company')}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />
        <TextField
          error={!!formMethodsEdit.formState.errors['department']}
          helperText={formMethodsEdit.formState.errors['department']?.message}
          label="Отдел"
          {...formMethodsEdit.register('department')}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />
        <TextField
          error={!!formMethodsEdit.formState.errors['jobTitle']}
          helperText={formMethodsEdit.formState.errors['jobTitle']?.message}
          label="Должность"
          {...formMethodsEdit.register('jobTitle')}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />

        <Button variant="contained" type="submit">Сохранить</Button>
        <Button variant="outlined" onClick={onCancel}>Отмена</Button>
      </Stack>
    </form>
  )
}
