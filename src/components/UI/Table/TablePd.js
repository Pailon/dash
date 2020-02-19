import React from 'react';
import MaterialTable from 'material-table';
import { Pd_data, Prep, Personalities, File_proj_act } from '../../../Data/Data'

export default function TablePd() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Название', field: 'title' },
      { title: 'Описание', field: 'description' },
      { title: 'Дата старта', field: 'start'},
      { title: 'Дата сдачи', field: 'end'},
      { title: 'Ссылка в Trello', field: 'link_trello'},
      { title: 'Направление', field: 'id_sub_unit'},
    ],
    data: [
     ...Pd_data
    ],
  });

  return (
    <MaterialTable
      title="Проектная деятельность"
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