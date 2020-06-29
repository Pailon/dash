import React from 'react'
import {Link} from "react-router-dom";

//компонент отображения таблицы

export default props => (
    // таблица в стиле bootstrap 
    <table className="table">  
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'department_name')}>
                    Наименование кафедры {props.sortField === 'department_name' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'begin_date')}>
                    Дата начала {props.sortField === 'begin_date' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'end_date')}>
                    Дата окончания {props.sortField === 'end_date' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'modified_date')}>
                    Дата изменения {props.sortField === 'modified_date' ? <small>{props.sort}</small> : null}
                </th>
                <th>

                </th>
                
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={Math.random()*100} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.department_name}</td>
                    <td>{item.begin_date}</td>
                    <td>{item.end_date}</td>
                    <td>{item.modified_date}</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-link"
                        >
                            <Link to={{
                                pathname: "/dep_load_detail",
                                propsId: item.id,
                            }}>
                                {/* <FA name='external-link-square-alt'/>  */}
                                Подробнее
                            </Link>
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>

    </table>
)