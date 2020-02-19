import React, { Component } from 'react';
import classes from './Rpd.module.css'
import { Rpd_data, Prep, Personalities } from '../../Data/Data'
import Button from '../../components/UI/Button/Button.js'
import TableRPD from '../../components/UI/Table/TableRPD'

export default class Rpd extends Component {



    download = () =>{

    }



    renderRpd() {
        return <table className={classes.RpdTable} width="100%"cellspacing="0" cellpadding="4">
            <tr>
                <td>Имя</td>
                <td>Фамилия</td>
                <td>Отчество</td>
                <td>РПД есть?</td>
                <td>Скачать РПД</td>
            </tr>
            {Personalities.map(element => {
                return (
                    <tr>
                        <td>{element.name}</td>
                        <td>{element.patronymic}</td>
                        <td>{element.surname}</td>
                        <td>{Rpd_data ? 'Сдано' : 'Не сдано'}</td>
                        <td><Button
                            type='primary'
                            onClick={this.download}
                        >Скачать РПД</Button></td>
                    </tr>
                )

            })}
        </table>
    }

    render() {
        return (
            <div className={classes.Rpd}>

                    <h1>Журнал РПД</h1>
                    {this.renderRpd()}
                    {/* <TableRPD/> */}

            </div>

        )
    }

}

