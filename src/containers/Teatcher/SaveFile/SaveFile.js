import React from "react";
import classes from './SaveFile.module.css'
import {link} from "../../../Link";
import {Button} from "@material-ui/core";

export default (props)=>{
    return(
        <React.Fragment>
            <h5>Файлы преподавателя</h5>
    <ul key={Math.random()*100}>
        {props.data.map(item=>{
                return(
                <li
                    key={item.id}
                    className={classes.list_a}
                    style={
                        {
                        marginBottom: '10px',
                        cursor:'pointer'
                        }
                    }
                    onClick={(event)=>{
                        let link = 'ind_plan'
                        props.loadingFile(event, item, link)
                    }}
                >{item.name}</li>
                )
            })
        }
    </ul>
        </React.Fragment>
    )
}
