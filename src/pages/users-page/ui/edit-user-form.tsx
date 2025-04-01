import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, CircularProgress, InputAdornment, Stack, TextField } from "@mui/material";
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

  const { data, isLoading, isFetching, error } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  const formMethodsEdit = useForm({
    resolver: yupResolver(schema),
    defaultValues: {} as UsersType,
  });

  useEffect(() => {
    if (data) {
      formMethodsEdit.reset(data)
    }
  }, [data, formMethodsEdit])


  const handleSubmit = formMethodsEdit.handleSubmit(
    async (value) => {
      try {
        await updateUser({ id: userId, ...value }).unwrap();
        onSubmit(value);
        formMethodsEdit.reset();
        onCancel();
      } catch (error) {
        console.error(error);
      }
    },
    (error) => console.error(error)
  );

  if (!data || isFetching || isLoading) {
    return <Box sx={{
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      width: "500px",
      height: "100vh"
    }}>
      <CircularProgress />
    </Box>
  };

  if (error) {
    return <Alert color="error">Network error</Alert>
  };

  return (

    <form onSubmit={handleSubmit}>
      <Stack direction="column" gap={3} sx={{ width: "500px", p: 3 }}>
        <TextField
          error={!!formMethodsEdit.formState.errors['name']}
          helperText={formMethodsEdit.formState.errors['name']?.message}
          label="Имя"
          {...formMethodsEdit.register('name')}
          sx={{ p: 0 }}
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
