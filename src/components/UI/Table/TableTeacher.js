import React from 'react';
import MaterialTable from 'material-table';
import { Rpd_data, Prep, Personalities } from '../../../Data/Data'
import axios from 'axios'


export default function TableTeacher() {

  // fetch('http://dashboard.kholodov.xyz/api/teachers')
  // .then(response => response.json())
  // .then(json => console.log(json))

  
  axios.get("http://dashboard.kholodov.xyz/Api/teachers")
  .then(response => console.log("response", response.data))
  
    // let url = 'http://dashboard.kholodov.xyz/api/teachers'


    //     fetch(url, { //http://dashboard.kholodov.xyz/api/
    //         method:'get',
    //         headers:{'Content-Type':'application/json'},

    //     }).then(function(response) {
    //         return response.json();
            
    //     }).then(response => {
    //         //const data = response
    //         console.log(response.json())
    //     }).catch(err => {
    //         console.error(err);
    //     });
  

  const [state, setState] = React.useState({
    columns: [
      { title: 'Фамилия', field: 'surname' },
      { title: 'Имя', field: 'name' },
      { title: 'Отчество', field: 'patronymic' },
      { title: 'Телефон', field: 'phone' },
      { title: 'Email', field: 'email' },
      { title: 'Ставка', field: 'rate' },
      { title: 'Позиция', field: 'position' },
    ],
    data: [
        ...Personalities
    ],
  });

  

  return (
    <MaterialTable
      title="Преподаватели"
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
