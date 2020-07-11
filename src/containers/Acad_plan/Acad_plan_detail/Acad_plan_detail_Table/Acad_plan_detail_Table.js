import React from 'react'
import './Acad_plan_detail_Table.css'
import {Link} from "react-router-dom";

//компонент отображения таблицы

var FA = require('react-fontawesome')


export default props => (
    // таблица в стиле bootstrap
    <table className="table table-sm table-hover">
        <thead>
        <tr>
            {/*<th onClick={props.onSort.bind(null, 'id')}>*/}
            {/*    ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}*/}
            {/*</th>*/}
            <th onClick={props.onSort.bind(null, 'code')}>
                Код {props.sortField === 'code' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'name')}>
                Наименование {props.sortField === 'name' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'zet')}>
                ЗЕТ {props.sortField === 'zet' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'zet')}>
                Всего часов {props.sortField === 'zet' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'zet')}>
                Аудиторные часы {props.sortField === 'zet' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'hours_lec')}>
                Лекционные часы {props.sortField === 'hours_lec' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'hours_sem')}>
                Семинарские часы {props.sortField === 'hours_sem' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'hours_lab')}>
                Лабораторные часы {props.sortField === 'hours_lab' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'zet')}>
                Самостоятельные работы {props.sortField === 'zet' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                Cеместр 1 (час) {props.sortField === 'semesters' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                Семестр 2 (час) {props.sortField === 'semesters' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                Семестр 3 (час) {props.sortField === 'semesters' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
               Семестр 4 (час) {props.sortField === 'semesters' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                семестр 5 (час) {props.sortField === 'semesters' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                Семестр 6 (час) {props.sortField === 'semesters' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'semesters')}>
                Семестр 7 (час) {props.sortField === 'semesters' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'zachets')}>
                Зачеты (сем.) {props.sortField === 'zachets' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'exams')}>
                Экзамены (сем.) {props.sortField === 'exams' ? <small><FA name={props.sortArrow} /></small> : null}
            </th>


        </tr>
        </thead>
        <tbody>
        {props.data.map(item => (
            <tr key={Math.random()*100} onClick={props.onRowSelect.bind(null, item)}>
                {/*<td>{item.id}</td>*/}
                <td>{item.code!== null? item.code:<p>---</p>}</td>
                <td>{item.name!==null ? item.name : <p>---</p>}</td>
                <td>{item.zet!==null ? item.zet : <p>---</p>}</td>
                <td>{item.zet!==null ? +item.zet*36 : <p>---</p>}</td>
                <td>{item.zet!==null ? +item.hours_lec + +item.hours_sem + +item.hours_lab : <p>---</p>}</td>
                <td>{item.hours_lec!==null ? item.hours_lec : <p>---</p>}</td>
                <td>{item.hours_sem!==null ? item.hours_sem : <p>---</p>}</td>
                <td>{item.hours_lab!==null ? item.hours_lab : <p>---</p>}</td>
                <td>{item.zet!==null ? +item.zet*36 - (+item.hours_lec + +item.hours_sem + +item.hours_lab) : <p>---</p>}</td>
                <td>{item.semesters[0]!== null? item.semesters[0]:<p>---</p>}</td>
                <td>{item.semesters[1]!== null? item.semesters[1]:<p>---</p>}</td>
                <td>{item.semesters[2]!== null? item.semesters[2]:<p>---</p>}</td>
                <td>{item.semesters[3]!== null? item.semesters[3]:<p>---</p>}</td>
                <td>{item.semesters[4]!== null? item.semesters[4]:<p>---</p>}</td>
                <td>{item.semesters[5]!== null? item.semesters[5]:<p>---</p>}</td>
                <td>{item.semesters[6]!== null? item.semesters[6]:<p>---</p>}</td>
                <td>{item.zachets!==null ? item.zachets.join(', ') : <p>---</p>}</td>
                <td>{item.exams!==null ? item.exams.join(',') : <p>---</p>}</td>

            </tr>
        ))}
        </tbody>

    </table>
)