import React from 'react'
import classes from './Teatchers.module.css'
import TeatcherList from './TeatchersList/TeatchersList'

const Teatchers = props => (
    <div>
        <p>
            <span>
                <strong>Преподователи</strong>&nbsp;
                
            </span>
            
        </p>
        <TeatcherList
            state={props.state}
            teatcher={props.name}
            onTeacherClik={props.onTeacherClik}
            />

    </div>
)

export default Teatchers

