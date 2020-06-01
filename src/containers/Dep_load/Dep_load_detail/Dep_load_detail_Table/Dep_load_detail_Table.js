import React from 'react'
import './Dep_load_detail_Table.css'
import {Link} from "react-router-dom";

//компонент отображения таблицы

export default props => (
    // таблица в стиле bootstrap 
    <table className="table table-sm table-hover">
        <thead>
            <tr style={{textAlign:'center'}}>
                {/*<th onClick={props.onSort.bind(null, 'dep_load_id')}>*/}
                {/*    ID {props.sortField === 'dep_load_id' ? <small>{props.sort}</small> : null}*/}
                {/*</th>*/}
                <th onClick={props.onSort.bind(null, 'name')}>
                    Наименование {props.sortField === 'name' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'groups')}>
                    Группы {props.sortField === 'groups' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_con_project')}>
                    Консультация проекта {props.sortField === 'hours_con_project' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_lec')}>
                    Лекций часов {props.sortField === 'hours_lec' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_sem')}>
                    Семенаров часов {props.sortField === 'hours_sem' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_leb')}>
                    Лабораторных часов {props.sortField === 'hours_lab' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_con_exam')}>
                    Консультация экзамена {props.sortField === 'hours_con_exam' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_zachet')}>
                    Зачет {props.sortField === 'hours_zachet' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_exam')}>
                    Экзамен {props.sortField === 'hours_exam' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_kurs_project')}>
                    Курсовой проект {props.sortField === 'hours_kurs_project' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_gek')}>
                    ГЭК {props.sortField === 'hours_gek' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_ruk_prakt')}>
                    Руководство практикой {props.sortField === 'hours_ruk_prakt' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_ruk_vkr')}>
                    Руководство ВКР {props.sortField === 'hours_ruk_vkr' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_ruk_mag')}>
                    Руководство магистратурой {props.sortField === 'hours_ruk_mag' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'hours_ruk_aspirant')}>
                    Руководство асперантурой {props.sortField === 'hours_ruk_aspirant' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'is_approved')}>
                    Подтверждено {props.sortField === 'is_approved' ? <small>{props.sort}</small> : null}
                </th>
                <th>

                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={Math.random()*100} onClick={props.onRowSelect.bind(null, item)}>
                    {/*<td>{item.dep_load_id}</td>*/}
                    <td>{item.name}</td>
                    <td>{item.groups!== null? item.groups.map(it =>(`${it.name} `)):<p>---</p>}</td>
                    <td>{item.hours_con_project!==null ? item.hours_con_project : <p>---</p>}</td>
                    <td>{item.hours_lec!==null ? item.hours_lec : <p>---</p>}</td>
                    <td>{item.hours_sem!==null ? item.hours_sem : <p>---</p>}</td>
                    <td>{item.hours_lab!==null ? item.hours_lab : <p>---</p>}</td>
                    <td>{item.hours_con_exam!==null ? item.hours_con_exam : <p>---</p>}</td>
                    <td>{item.hours_zachet!==null ? item.hours_zachet : <p>---</p>}</td>
                    <td>{item.hours_exam!==null ? item.hours_exam : <p>---</p>}</td>
                    <td>{item.hours_kurs_project!==null ? item.hours_kurs_project : <p>---</p>}</td>
                    <td>{item.hours_gek!==null ? item.hours_gek : <p>---</p>}</td>
                    <td>{item.hours_ruk_prakt!==null ? item.hours_ruk_prakt : <p>---</p>}</td>
                    <td>{item.hours_ruk_vkr!==null ? item.hours_ruk_vkr : <p>---</p>}</td>
                    <td>{item.hours_ruk_mag!==null ? item.hours_ruk_mag : <p>---</p>}</td>
                    <td>{item.hours_ruk_aspirant!==null ? item.hours_ruk_aspirant : <p>---</p>}</td>
                    <td>{item.is_approved!==null ? (item.is_approved==true? 'Подтверждено': 'Не подтверждено') : (<p>---</p>)}</td>
                    <Link to={{
                        pathname: "/dep_load_rpd",
                        data: item,
                    }}>
                        {/* <FA name='external-link-square-alt'/>  */}
                        Подробнее
                    </Link>
                </tr>
            ))}
        </tbody>

    </table>
)