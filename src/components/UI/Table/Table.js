import React from 'react'

export default props => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'person_id')}>
                    ID {props.sortField === 'person_id' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'name')}>
                    Имя {props.sortField === 'name' ? <small>{props.sort}</small> : null}
                    </th>
                <th onClick={props.onSort.bind(null, 'surname')}>
                    Фамилия {props.sortField === 'surname' ? <small>{props.sort}</small> : null}
                    </th>
                <th onClick={props.onSort.bind(null, 'patronymic')}>
                    Отчество {props.sortField === 'patronymic' ? <small>{props.sort}</small> : null}
                    </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                    E-mail {props.sortField === 'email' ? <small>{props.sort}</small> : null}
                    </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                    Номер телефона {props.sortField === 'phone' ? <small>{props.sort}</small> : null}
                    </th>
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
                </tr>
            ))}
        </tbody>

    </table>
)