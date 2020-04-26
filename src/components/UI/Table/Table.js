import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import classes from './Table.module.css'
import {Link} from 'react-router-dom'

//компонент отображения таблицы

var FA = require('react-fontawesome')

export default props => (

    

    // таблица в стиле bootstrap 
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'person_id')}>
                    ID {props.sortField === 'person_id' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'name')}>
                    Имя {props.sortField === 'name' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'surname')}>
                    Фамилия {props.sortField === 'surname' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'patronymic')}>
                    Отчество {props.sortField === 'patronymic' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                    E-mail {props.sortField === 'email' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                    Номер телефона {props.sortField === 'phone' ? <small><FA name={props.sortArrow} /></small> : null}
                </th>
                <th> </th>
                </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id} onClick={props.onRowSelect.bind(null, item)}>

                    <td>{item.person_id}</td>

                    
                    <td 
                    className={classes.edit} 
                    contentEditable="true"  
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                    onBlur={(event)=>{
                        let oldData = item.name
                        item.name = event.currentTarget.firstChild.data
                        props.onUpdate.call(this,event.currentTarget.firstChild.data, item, item.id, oldData) 
                    
                    }}
                    //onBlur={(event)=>{item.name = event.currentTarget.firstChild.data}}
                    suppressContentEditableWarning={true}
                    
                    >{item.name}</td>


                    <td
                        className={classes.edit} 
                        contentEditable="true"  
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event)=>{
                            let oldData = item.surname
                            item.surname = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData) 
                        
                        }}
                        suppressContentEditableWarning={true}
                    >{item.surname}</td>
                    <td
                        className={classes.edit} 
                        contentEditable="true"  
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event)=>{
                            let oldData = item.patronymic
                            item.patronymic = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData) 
                        
                        }}
                        suppressContentEditableWarning={true}
                    >{item.patronymic}</td>
                    <td
                        className={classes.edit} 
                        contentEditable="true"  
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event)=>{
                            let oldData = item.email
                            item.email = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData) 
                        
                        }}
                        suppressContentEditableWarning={true}
                    >{item.email}</td>
                    <td
                        className={classes.edit} 
                        contentEditable="true"  
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onBlur={(event)=>{
                            let oldData = item.phone
                            item.phone = event.currentTarget.firstChild.data
                            props.onUpdate(event.currentTarget.firstChild.data, item, item.id, oldData) 
                        
                        }}
                        suppressContentEditableWarning={true}
                    >{item.phone}</td>
                    <td>
                        <button type="button" className="btn btn-link"><Link to={{pathname: "/teatcher", propsItem: item}}>Подробнее</Link></button>
                    </td>
                </tr>
            ))}
        </tbody>

    </table>
)