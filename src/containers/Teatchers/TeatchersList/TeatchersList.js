import React from 'react'
import classes from './TeatchersList.module.css'
import TeatcherItem from './TeatchersItem/TeatchersItem.js'

const TeatcherList = props =>(
    <ul className={classes.TeatcherList}>
        {props.teatchers.map((teatcher,name, index)=> {
            return(
                <TeatcherItem
                key={index}
                teatcher={name}
                onTeacherClik={props.onTeacherClik}
                state={props.state ? props.state[teatcher.id]:null}
                />
            )
        })}
    </ul>
)

export default TeatcherList