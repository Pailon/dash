import React, { Component } from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import Prep from '../../froms/prepod/Prep'
import Discipline from '../../froms/discipline/Discipline'


export default class QuizList extends Component {
    
    renderQuizes(){
        return[1,2,3].map((quiz, index)=>{
            return(
                <li 
                key={index}
                >
                    <NavLink to={'/quiz/' + quiz}>
                        {/* Тест {quiz} */}
                    </NavLink>
                </li>
            )
        })
    }


    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Модули</h1>
                    <ul>
                        <Prep/>
                        <Discipline/>
                    </ul>
                </div>

            </div>
        )
    }
}