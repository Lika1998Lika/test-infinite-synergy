import { GridColDef } from "@mui/x-data-grid";

export const colums: GridColDef[] = [
  {field: 'firstName', headerName: 'имя', flex: 1 },
  {field: 'lastName', headerName: 'фамилия', flex: 1 },
  {field: 'age', headerName: 'возраст', flex: 1 },
  {field: 'email', headerName: 'email', flex: 1 },
  {field: 'department', headerName: 'отделение', flex: 1 },
  {field: 'company', headerName: 'компания', flex: 1 },
  {field: 'jobTitle', headerName: 'должность', flex: 1 },
];