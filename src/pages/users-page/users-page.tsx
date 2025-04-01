import { Alert, Box, Button, CircularProgress, Drawer, Stack } from '@mui/material';
import { useGetUsersQuery, useUpdateUserMutation } from '../../entities/users/api/service'
import { AutoSizer, List } from 'react-virtualized';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useRef, useState } from "react";
import { EditUserForm } from './ui/edit-user-form';
import { UsersType } from '../../entities/users';
import './style.css';

export function UsersPage() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const listRef = useRef<List>(null);

  const handleScroll = (position: number) => {
    setScrollTop(position)
  };

  const openModal = (id: number) => {
    setOpen(true)
    setSelectedId(id)
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedId(null);
  }

  const { data, isLoading, error, isFetching } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToPosition(scrollTop)
    }
  }, [data]);

  const handleUpdateUser = async (value: Omit<UsersType, 'id'>) => {
    if (selectedId === null) {
      console.error("Selected user ID is null");
      return;
    }
    try {
      await updateUser({ id: selectedId, ...value }).unwrap();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };


  if (!data || isFetching || isLoading) {
    return <Box sx={{
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      height: "100vh",
      width: "100%"
    }}>
      <CircularProgress />
    </Box>
  };

  if (error) {
    return <Alert color="error">Network error</Alert>
  };

  return (
    <div className="container_page">
      <div style={{ width: "100%", height: "100vh" }}>
        <AutoSizer>
          {
            ({ width, height }) => (
              <List
                ref={listRef}
                width={width}
                height={height}
                rowHeight={50}
                rowCount={data.length}
                onScroll={({ scrollTop }) => handleScroll(scrollTop)}
                rowRenderer={({ key, index, style }) => {
                  const person = data[index];

                  return (
                    <div key={key} style={style}>
                      <Stack direction="row" justifyContent="space-between" sx={{ border: "1px underline black" }}>
                        <div className="list_box">
                          <PersonIcon />
                          <h2 className="list_text">{`${person.lastName} ${person.firstName}(${person.jobTitle})`}</h2>
                        </div>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => openModal(person.id)}
                          sx={{ marginRight: "20px" }}
                        >
                          Редактировать
                        </Button>
                      </Stack>
                    </div>
                  )
                }}
              />
            )
          }
        </AutoSizer>
      </div>
      <Drawer open={open && Boolean(selectedId)} onClose={closeModal} anchor="right" sx={{ width: "500px" }}>
        {
          selectedId && (<EditUserForm
            userId={selectedId}
            onCancel={closeModal}
            onSubmit={handleUpdateUser}
          />)
        }
      </Drawer>
    </div >
  )
};
