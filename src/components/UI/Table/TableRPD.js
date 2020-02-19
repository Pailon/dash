import React from 'react';
import MaterialTable from 'material-table';
import {  Rpd_data, Prep, Personalities  } from '../../../Data/Data'

export default function TableRPD() {
  const [state, setState] = React.useState({
    columns: [
        { title: 'Фамилия', field: 'surname' },
        { title: 'Имя', field: 'name' },
        { title: 'Отчество', field: 'patronymic' },
      { title: 'РПД есть?', field: 'end'},
      { title: 'Скачать РПД', field: 'link_trello'},
    ],
    data: [
     ...Rpd_data,
     ...Personalities
    ],
  });

  return (
    <MaterialTable
      title="РПД"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}