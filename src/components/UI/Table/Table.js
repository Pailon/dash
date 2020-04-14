import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';



//компонент отображения таблицы

var FA = require('react-fontawesome')
export let name ='sad'


const textFiled= (item) => (
    <React.Fragment>
    <TextField
    margin="dense"
    id="updateData"
    label="Изменить"
    type="text"
    fullWidth = {true}
    error={false}
    onChange={(event)=>item.name = event.target.value}
    defaultValue={item.name}
  />
  </React.Fragment>
)








export default props => (

    // таблица в стиле bootstrap 
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'person_id')}>
                    ID {props.sortField === 'person_id' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'name')}>
                    Имя {props.sortField === 'name' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'surname')}>
                    Фамилия {props.sortField === 'surname' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'patronymic')}>
                    Отчество {props.sortField === 'patronymic' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                    E-mail {props.sortField === 'email' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                    Номер телефона {props.sortField === 'phone' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th> ЧекБокс </th>
                </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.person_id}</td>
                    <td onDoubleClick={props.onUpdate.bind(null, 'name')} >{item.name}</td>
                    <td onDoubleClick={props.onUpdate.bind(null, 'surname')} >{item.surname}</td>
                    <td onDoubleClick={props.onUpdate.bind(null, 'patronymic')} >{item.patronymic}</td>
                    <td onDoubleClick={props.onUpdate.bind(null, 'email')} >{item.email}</td>
                    <td onDoubleClick={props.onUpdate.bind(null, 'phone')} >{item.phone}</td>
                    <td>
                        <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </td>
                </tr>
            ))}
        </tbody>

    </table>
)