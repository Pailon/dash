import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';

//компонент отображения таблицы

var FA = require('react-fontawesome')



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
                <th onClick={true}> </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.person_id}</td>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.patronymic}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
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