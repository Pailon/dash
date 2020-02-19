import React, {Component} from 'react';
import classes from './Pd.module.css';
import { Pd_data, Prep, Personalities, File_proj_act } from '../../Data/Data'
import Button from '../../components/UI/Button/Button.js'
import TablePd from '../../components/UI/Table/TablePd'

export default class Pd extends Component{

	    renderPd() {
        return <table className={classes.PdTable} width="100%"cellspacing="0" cellpadding="4">
            <tr>
                <td>Название</td>
                <td>Описание</td>
                <td>Дата старта</td>
                <td>Дата сдачи</td>
                <td>Ссылка в Trello</td>
                <td>Направление</td>
                <td>Материалы ПД</td>
            </tr>
            {Pd_data.map(element => {
                return (
                    <tr>
                        <td>{element.title}</td>
                        <td>{element.description}</td>
                        <td>{element.start}</td>
                        <td>{element.end}</td>
                        <td>{element.link_trello}</td>
                        <td>{element.id_sub_unit}</td>
                        <td><Button
                            type='primary'
                        >Скачать приклепленные файлы</Button></td>
                    </tr>
                )

            })}
        </table>
    }

    render(){
        return(
        <div className={classes.Pd}>
            <div>
            <TablePd/>
            </div>
        </div>

        )
    }

}
