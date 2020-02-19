import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { Rpd_data, Prep, Personalities } from '../../Data/Data'
import ModalExampleControlled from '../../components/ModalShow/Modal.js'
import TableTeacher from '../../components/UI/Table/TableTeacher'




export default class QuizList extends Component {


    showModal = () =>{
        return <ModalExampleControlled/>
    }


    renderPrep() {

        return <table className={classes.PrepTable}>
            <tr>
                <td>Имя</td>
                <td>Отчество</td>
                <td>Фамилия</td>
                <td>Подробная информация</td>
            </tr>
            {Personalities.map(element => {
                return (
                    <tr 
                    onClick={this.showModal}
                    >
                        <td>{element.name}</td>
                        <td>{element.patronymic}</td>
                        <td>{element.surname}</td>
                        <td><ModalExampleControlled id={element.id}/></td>
                    </tr>
                )

            })}

            
        </table>
    }


    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    {/* <h1>Преподаватели</h1> */}
                    {/* <ul> */}

                                {/* {this.renderPrep()} */}
                                <TableTeacher/>

                    {/* </ul> */}
                </div>

            </div>
        )
    }
}