import React from 'react'
import classes from './Group.module.css'

//компонент отображения таблицы

var FA = require('react-fontawesome')


export default props => (
    // таблица в стиле bootstrap 
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'name')}>
                    Номер группы {props.sortField === 'name' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'specialties_code')}>
                    Код {props.sortField === 'specialties_code' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'specialties_name')}>
                    Наименование программы {props.sortField === 'specialties_name' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'sub_unit_name')}>
                    Направление {props.sortField === 'sub_unit_name' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.specialties_id} onClick={props.onRowSelect.bind(null, item)} spellCheck="false">
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.id
                            item.id = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.id}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.name
                            item.name = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.name}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.specialties_code
                            item.specialties_code = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.specialties_code}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.specialties_name
                            item.specialties_name = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.specialties_name}</td>
                    <td
                        className={classes.edit}
                        contentEditable="true"
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event) => {
                            let oldData = item.sub_unit_name
                            item.sub_unit_name = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                        }}
                        suppressContentEditableWarning={true}
                    >{item.sub_unit_name}</td>
                </tr>
            ))}
        </tbody>

    </table>
)