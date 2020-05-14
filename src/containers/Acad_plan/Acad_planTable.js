import React from 'react'
import {Link} from "react-router-dom";

//компонент отображения таблицы

export default props => (
    // таблица в стиле bootstrap 
    <table className="table">  
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'person_id' ? <small>{props.sort}</small> : null}   
                </th>
                {/* <th onClick={props.onSort.bind(null, 'specialties_id')}>
                    Specialties_id {props.sortField === 'specialties_id' ? <small>{props.sort}</small> : null}
                </th> */}
                <th onClick={props.onSort.bind(null, 'name')}>
                    Name {props.sortField === 'name' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'code')}>
                    Код {props.sortField === 'code' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'profile')}>
                    Профиль {props.sortField === 'profile' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'educ_form')}>
                    Форма обучения {props.sortField === 'educ_form' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'educ_programm')}>
                    Программа обучения {props.sortField === 'educ_programm' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'educ_years')}>
                    Срок обучения {props.sortField === 'educ_years' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'year_join')}>
                    Дата окончания {props.sortField === 'year_join' ? <small>{props.sort}</small> : null}
                </th>
                <th>

                </th>
                {/* <th onClick={props.onSort.bind(null, 'sub_unit_id')}>
                    Что то {props.sortField === 'sub_unit_id' ? <small>{props.sort}</small> : null}
                </th> */}
                
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.specialties_id} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.profile}</td>
                    <td>{item.educ_form}</td>
                    <td>{item.educ_programm}</td>
                    <td>{item.educ_years}</td>
                    <td>{item.year_join}</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-link"
                        >
                            <Link to={{
                                pathname: "/acad_plan_detail",
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