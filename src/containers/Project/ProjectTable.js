import React from 'react'
import classes from './Project.module.css'
import {Link} from "react-router-dom";
//компонент отображения таблицы

var FA = require('react-fontawesome')


export default props => (
    // таблица в стиле bootstrap 
    <table className="table">
        <thead>
            <tr style={{textAlign:'center'}}>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'name')}>
                    Name {props.sortField === 'name' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'students_count')}>
                    Количество студентов {props.sortField === 'students_count' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'begin_date')}>
                    Дата начала {props.sortField === 'begin_date' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'end_date')}>
                    Дата окончания {props.sortField === 'end_date' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'description')}>
                    Описание {props.sortField === 'description' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'teatcher_id')}>
                    Куратор {props.sortField === 'teatcher_id' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'link_trello')}>
                    Trello {props.sortField === 'link_trello' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th>

                </th>

            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.specialties_id} onClick={props.onRowSelect.bind(null, item)} spellCheck="false">
                    <td>{item.id}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        onBlur={(event) => {
                            let oldData = item.name
                            item.name = event.currentTarget.firstChild.data
                            props.onUpdate.call(this, event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                        suppressContentEditableWarning={true}
                    >{item.name}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.students_count
                            item.students_count = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.students_count}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.begin_date
                            item.begin_date = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.begin_date}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.end_date
                            item.end_date = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.end_date}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.description
                            item.description = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.description}</td>
                    <td
                         className={classes.edit}
                        // contentEditable="true"
                        // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        // onBlur={(event) => {
                        //     let oldData = item.teacher_id
                        //     item.teacher_id = event.currentTarget.firstChild.data
                        //     props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)
                        //
                        // }}
                        // suppressContentEditableWarning={true}
                    >{item.teatch !== undefined ?item.teatch.surname :'---'}</td>

                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.link_trello
                            item.link_trello = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.link_trello}</td>

                    <td>
                        <Link to={{
                            pathname: "/project_detail",
                            data: item,
                        }}>
                            {/* <FA name='external-link-square-alt'/>  */}
                            Подробнее
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>

    </table>
)