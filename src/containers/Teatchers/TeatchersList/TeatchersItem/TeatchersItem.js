import React from 'react'
import classes from './TeatchersItem.module.css'

const TeatchersItem = props => {
    const cls =[classes.TeatcherItem]

    if (props.state){
        cls.push(classes[props.state])
    }

    return(
        <li
        className={cls.join(' ')}
        onClick={()=> props.onAnswerClick(props.teatcher.id)}
        >
            {props.teatcher.name}
        </li>
    )
}

export default TeatchersItem