import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Prep from '../../froms/prepod/Prep'
import Discipline from '../../froms/discipline/Discipline'
import { Button, Modal, Label } from 'react-bootstrap'
import { Link, Route, Router } from 'react-router-dom'
import ModalShow from '../../components/ModalShow/ModalShow'
import history from '../../history'


//Вот так вот
export default class QuizList extends Component {


    renderPrep() {
        return [
            'Толстиков Антон Витальевич',
            'Иванов Иван Иванович',
            'Симонов Владлен Федорович'
        ].map((quiz, index) => {
            return (
                <li
                    key={index}
                >
                    <div
                        className={classes.Prep}

                    >
                        <p> {quiz} </p>
                    </div>
                </li>
            )
        })
    }


    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Преподаватели</h1>
                    <ul>

                        <Router history={history}>
                            <div>
                                <Link to='/modal'>{this.renderPrep()}</Link>
                                <Route path='/modal' component={ModalShow} />
                            </div>
                        </Router>

                        {/*  */}


                    </ul>
                </div>

            </div>
        )
    }
}