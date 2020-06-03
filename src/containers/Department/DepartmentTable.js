import React from 'react'
import classes from './Department.module.css'
import DeleteIcon from '@material-ui/icons/Delete';

//компонент отображения таблицы

var FA = require('react-fontawesome')


export default props => (
    // таблица в стиле bootstrap
    <table className="table">
        <thead>
        <tr style={{textAlign: 'center'}}>
            <th onClick={props.onSort.bind(null, 'id')}>
                ID {props.sortField === 'id' ? <small><FA name={props.sortArrow}/></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'name')}>
                Наименование кафедры {props.sortField === 'name' ? <small><FA name={props.sortArrow}/></small> : null}
            </th>
            <th onClick={props.onSort.bind(null, 'specialties_code')}>

            </th>
            {/*<th onClick={props.onSort.bind(null, 'specialties_name')}>*/}
            {/*    Наименование специальности {props.sortField === 'specialties_name' ? <small><FA name={props.sortArrow} /></small> : null}*/}
            {/*</th>*/}
            {/*<th onClick={props.onSort.bind(null, 'sub_unit_name')}>*/}
            {/*    Направление {props.sortField === 'sub_unit_name' ? <small><FA name={props.sortArrow} /></small> : null}*/}
            {/*</th>*/}
            {/*<th onClick={props.onSort.bind(null, 'specialties_id')}>*/}
            {/*    ID Специальности {props.sortField === 'specialties_id' ? <small><FA name={props.sortArrow} /></small> : null}*/}
            {/*</th>*/}
        </tr>
        </thead>
        <tbody>
        {props.data.map(item => (
            <tr key={item.id} onClick={props.onRowSelect.bind(null, item)} spellCheck="false">
                <td
                    className={classes.edit}
                    // contentEditable="true"
                    // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    // onBlur={(event) => {
                    //     let oldData = item.id
                    //     item.id = event.currentTarget.firstChild.data
                    //     props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)
                    //
                    // }}
                    // suppressContentEditableWarning={true}
                >{item.id}</td>
                <td
                    className={classes.edit}
                    contentEditable="true"
                    onKeyPress={(e) => {
                        e.key === 'Enter' && e.preventDefault();
                    }}
                    onBlur={(event) => {
                        let oldData = item.name
                        item.name = event.currentTarget.firstChild.data
                        props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)

                    }}
                    suppressContentEditableWarning={true}
                >{item.name}</td>
                <td>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={(event)=>{
                            props.delete(item.id)
                        }}
                    />
                </td>
                {/*<td*/}
                {/*    className={classes.edit}*/}
                {/*    // contentEditable="true"*/}
                {/*    // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}*/}
                {/*    // onBlur={(event) => {*/}
                {/*    //     let oldData = item.specialties_code*/}
                {/*    //     item.specialties_code = event.currentTarget.firstChild.data*/}
                {/*    //     props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)*/}
                {/*    //*/}
                {/*    // }}*/}
                {/*    // suppressContentEditableWarning={true}*/}
                {/*>{item.specialties_code}</td>*/}
                {/*<td*/}
                {/*    className={classes.edit}*/}
                {/*    // contentEditable="true"*/}
                {/*    // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}*/}
                {/*    // onBlur={(event) => {*/}
                {/*    //     let oldData = item.specialties_name*/}
                {/*    //     item.specialties_name = event.currentTarget.firstChild.data*/}
                {/*    //     props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)*/}
                {/*    //*/}
                {/*    // }}*/}
                {/*    // suppressContentEditableWarning={true}*/}
                {/*>{item.specialties_name}</td>*/}
                {/*<td*/}
                {/*    className={classes.edit}*/}
                {/*    // contentEditable="true"*/}
                {/*    // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}*/}
                {/*    // onBlur={(event) => {*/}
                {/*    //     let oldData = item.sub_unit_name*/}
                {/*    //     item.sub_unit_name = event.currentTarget.firstChild.data*/}
                {/*    //     props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)*/}
                {/*    //*/}
                {/*    // }}*/}
                {/*    // suppressContentEditableWarning={true}*/}
                {/*>{item.sub_unit_name}</td>*/}
                {/*/!*<td*!/*/}
                {/*/!*    className={classes.edit}*!/*/}
                {/*/!*    contentEditable="true"*!/*/}
                {/*/!*    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}*!/*/}
                {/*/!*    onBlur={(event) => {*!/*/}
                {/*/!*        let oldData = item.specialties_id*!/*/}
                {/*/!*        item.specialties_id = event.currentTarget.firstChild.data*!/*/}
                {/*/!*        props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData)*!/*/}

                {/*/!*    }}*!/*/}
                {/*/!*    suppressContentEditableWarning={true}*!/*/}
                {/*/!*>{item.specialties_name}</td>*!/*/}
                {/*/!*{console.log(item)}*!/*/}
            </tr>


        ))}
        </tbody>

    </table>
);