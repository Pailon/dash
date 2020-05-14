import React from 'react'
import './Acad_plan_detail_Table.css'
import {Link} from "react-router-dom";

//компонент отображения таблицы

export default props => (
    // таблица в стиле bootstrap
    <table className="table table-sm table-hover">
        <thead>
        <tr>
            {/*<th onClick={props.onSort.bind(null, 'id')}>*/}
            {/*    ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}*/}
            {/*</th>*/}
            <th onClick={props.onSort.bind(null, 'code')}>
                Код {props.sortField === 'code' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'name')}>
                Наименование {props.sortField === 'name' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'zet')}>
                ЗЕТ {props.sortField === 'zet' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'hours_lec')}>
                Лекционные часы {props.sortField === 'hours_lec' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'hours_sem')}>
                Семинарские часы {props.sortField === 'hours_sem' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'hours_lab')}>
                Лабораторные часы {props.sortField === 'hours_lab' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                семестр 1 {props.sortField === 'semesters' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                семестр 2 {props.sortField === 'semesters' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                семестр 3 {props.sortField === 'semesters' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
               семестр 4 {props.sortField === 'semesters' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                семестр 5 {props.sortField === 'semesters' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                семестр 6 {props.sortField === 'semesters' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                семестр 7 {props.sortField === 'semesters' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'zachets')}>
                Зачеты {props.sortField === 'zachets' ? <small>{props.sort}</small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'exams')}>
                Экзамены {props.sortField === 'exams' ? <small>{props.sort}</small> : null}
            </th>


        </tr>
        </thead>
        <tbody>
        {props.data.map(item => (
            <tr key={Math.random()*100} onClick={props.onRowSelect.bind(null, item)}>
                {/*<td>{item.dep_load_id}</td>*/}
                {/*<td>{item.id}</td>*/}
                <td>{item.code!== null? item.code:<p>---</p>}</td>
                <td>{item.name!==null ? item.name : <p>---</p>}</td>
                <td>{item.zet!==null ? item.zet : <p>---</p>}</td>
                <td>{item.hours_lec!==null ? item.hours_lec : <p>---</p>}</td>
                <td>{item.hours_sem!==null ? item.hours_sem : <p>---</p>}</td>
                <td>{item.hours_lab!==null ? item.hours_lab : <p>---</p>}</td>
                <td>{item.semesters[0]!== null? item.semesters[0]:<p>---</p>}</td>
                <td>{item.semesters[1]!== null? item.semesters[1]:<p>---</p>}</td>
                <td>{item.semesters[2]!== null? item.semesters[2]:<p>---</p>}</td>
                <td>{item.semesters[3]!== null? item.semesters[3]:<p>---</p>}</td>
                <td>{item.semesters[4]!== null? item.semesters[4]:<p>---</p>}</td>
                <td>{item.semesters[5]!== null? item.semesters[5]:<p>---</p>}</td>
                <td>{item.semesters[6]!== null? item.semesters[6]:<p>---</p>}</td>
                <td>{item.zachets!==null ? item.zachets.join(',') : <p>---</p>}</td>
                <td>{item.exams!==null ? item.exams.join('') : <p>---</p>}</td>

            </tr>
        ))}
        </tbody>

    </table>
)