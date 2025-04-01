import { Alert, Box, Button, CircularProgress, Drawer, Stack } from '@mui/material';
import { useGetUsersQuery, useUpdateUserMutation } from '../../entities/users/api/service'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import PersonIcon from '@mui/icons-material/Person';
import { useRef, useState } from "react";
import { EditUserForm } from './ui/edit-user-form';
import { UsersType } from '../../entities/users';
import './style.css';

export function UsersPage() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const listRef = useRef<List | null>(null); // 👈 Реф на List
  const scrollPosition = useRef(0); // 👈 Храним позицию скролла

  const openModal = (id: number) => {
    setOpen(true)
    setSelectedId(id)
  };

  const closeModal = () => setOpen(false);

  const { data, isLoading, error, isFetching } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  // const handleUpdateUser = async (values: Omit<UsersType, 'id'>) => {
  //   if (!selectedId) return;
  //   await updateUser({ id: selectedId, ...values });
  //   closeModal();
  // };


  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    fixedHeight: true
  }));

  const handleUpdateUser = async (value: Omit<UsersType, 'id'>) => {
    if (selectedId === null) {
      console.error("Selected user ID is null");
      return;
    }
    try {
      // Выполняется мутация обновления
      if (listRef.current) {
        scrollPosition.current = listRef.current.Grid?.state.scrollTop || 0;
      }

      await updateUser({ id: selectedId, ...value }).unwrap();
      closeModal(); // Закрытие модального окна после успешного обновления
    } catch (error) {
      console.error(error);
    }
  };

  if (!data || isFetching || isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: "center" }}><CircularProgress /></Box>
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
                deferredMeasurementCache={cache.current}
                rowCount={data.length}
                scrollTop={scrollPosition.current}
                onScroll={({ scrollTop }) => (scrollPosition.current = scrollTop)}
                rowRenderer={({ key, index, style, parent }) => {
                  const person = data[index];

                  return (
                    <CellMeasurer
                      key={key}
                      cache={cache.current}
                      parent={parent}
                      columnIndex={0}
                      rowIndex={index}
                    >
                      <div style={style}>
                        <Stack direction="row" justifyContent="space-between" sx={{ border: "1px underline black" }}>
                          <div className="list_box">
                            <PersonIcon />
                            <h2 className="list_text">{`${person.lastName} ${person.firstName}`}</h2>
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
                    </CellMeasurer>
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
