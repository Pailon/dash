import React from 'react'
import classes from './Specialty.module.css'
var FA = require('react-fontawesome')

//компонент отображения таблицы

export default props => (
    // таблица в стиле bootstrap 
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'name')}>
                    Наименование {props.sortField === 'name' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'code')}>
                    Код {props.sortField === 'code' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'profile')}>
                    Профиль {props.sortField === 'profile' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'educ_form')}>
                    Программа обучения {props.sortField === 'educ_form' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'educ_programm')}>
                    Форма обучения {props.sortField === 'educ_programm' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'educ_years')}>
                    Направление {props.sortField === 'educ_years' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'year_join')}>
                    Срок обучения {props.sortField === 'year_join' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                {/* <th onClick={props.onSort.bind(null, 'sub_unit_id')}>
                    Что то {props.sortField === 'sub_unit_id' ? <small>{props.sort}</small> : null}
                </th> */}
                <th onClick={props.onSort.bind(null, 'sub_unit_name')}>
                    Дата окончания {props.sortField === 'sub_unit_name' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>

            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + Math.random()*100} onClick={props.onRowSelect.bind(null, item)} spellCheck="false">
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
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        onBlur={(event) => {
                            let oldData = item.code
                            item.code = event.currentTarget.firstChild.data
                            props.onUpdate.call(this, event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                        suppressContentEditableWarning={true}

                    >{item.code}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        onBlur={(event) => {
                            let oldData = item.sub_unit_name
                            item.sub_unit_name = event.currentTarget.firstChild.data
                            props.onUpdate.call(this, event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                        suppressContentEditableWarning={true}

                    >{item.sub_unit_name}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        onBlur={(event) => {
                            let oldData = item.profile
                            item.profile = event.currentTarget.firstChild.data
                            props.onUpdate.call(this, event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                        suppressContentEditableWarning={true}

                    >{item.profile}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        onBlur={(event) => {
                            let oldData = item.educ_form
                            item.educ_form = event.currentTarget.firstChild.data
                            props.onUpdate.call(this, event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                        suppressContentEditableWarning={true}

                    >{item.educ_form}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        onBlur={(event) => {
                            let oldData = item.educ_programm
                            item.educ_programm = event.currentTarget.firstChild.data
                            props.onUpdate.call(this, event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                        suppressContentEditableWarning={true}

                    >{item.educ_programm}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        onBlur={(event) => {
                            let oldData = item.educ_years
                            item.educ_years = event.currentTarget.firstChild.data
                            props.onUpdate.call(this, event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                        suppressContentEditableWarning={true}

                    >{item.educ_years}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        onBlur={(event) => {
                            let oldData = item.year_join
                            item.year_join = event.currentTarget.firstChild.data
                            props.onUpdate.call(this, event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                        suppressContentEditableWarning={true}

                    >{item.year_join}</td>


                </tr>
            ))}
        </tbody>

    </table>
)